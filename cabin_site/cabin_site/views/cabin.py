from cabin_site.models.user import User
from cabin_site.models.cabin import Cabin
from cabin_site.models.trip import Trip
from cabin_site.serializers.cabin import CabinSerializer
from cabin_site.serializers.user import UserSerializer

from rest_framework import generics, status, views
from rest_framework.response import Response


class CabinList(generics.ListCreateAPIView):
    model = Cabin
    serializer_class = CabinSerializer

    def get_queryset(self):
        return Cabin.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = CabinSerializer(data=request.data)

        if not serializer.is_valid():
            print("error in serializer validation")
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        new_cabin = serializer.data
        print("new cabin")
        print(new_cabin)
        trip_id = request.data.get("tripId", "")

        if trip_id == "" or trip_id is None:
            print("TripId was missing from submission")
            return Response(
                "Trip Id is missing from submission", status=status.HTTP_400_BAD_REQUEST
            )

        trip = Trip.objects.filter(id=trip_id).first()

        trip.cabins.add(new_cabin["id"])

        print(f"Cabin {new_cabin['id']} added to trip {trip.id}")

        trip.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CabinDetail(generics.RetrieveAPIView):
    model = Cabin
    serializer_class = CabinSerializer
    queryset = Cabin.objects.all()

    def patch(self, request, pk):
        print(f"PATCHing Cabin {pk}")
        cabin = Cabin.objects.filter(id=pk).first()

        if cabin is None:
            return Response(
                f"Cabin with id {pk} does not exist", status=status.HTTP_404_NOT_FOUND
            )
        serializer = CabinSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if cabin.city != serializer.data.get(
            "city", ""
        ) or cabin.state != serializer.data.get("state", ""):
            return Response(
                "You cannot change the city or state. Delete the cabin and submit a new one",
                status=status.HTTP_400_BAD_REQUEST,
            )

        cabin.things_to_do = serializer.data["things_to_do"]
        cabin.listing_url = serializer.data["listing_url"]
        cabin.image_url = serializer.data["image_url"]

        cabin.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        print(f"Deleting Cabin {pk}")

        Cabin.objects.filter(id=pk).delete()

        return Response(status=status.HTTP_200_OK)


# TODO: patch endpoint for updating
class SubmitVoteView(views.APIView):

    def get(self, request, *args, **kwargs):
        cabin_id = self.kwargs.get("pk")
        if not cabin_id:
            return Response({"error": "cabin_id parameter is required"}, status=400)

        cabin = Cabin.objects.filter(id=cabin_id).first()
        users = cabin.votes.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        name = request.data.get("name")
        cabin_id = request.data.get("cabin_id")

        if not name:
            return Response({"error": "Invalid vote submission"}, status=400)

        user = User.objects.filter(name=name).first()

        cabin = Cabin.objects.filter(id=cabin_id).first()

        # TODO: add removing option
        if user in cabin.votes.all():
            return Response(
                {"error": "You have already voted for this cabin"}, status=400
            )

        cabin.votes.add(user)
        cabin.save()

        return Response({"success": "Vote submitted"})
