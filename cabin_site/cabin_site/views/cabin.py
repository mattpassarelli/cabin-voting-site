from cabin_site.models.cabin import Cabin
from cabin_site.serializers.cabin import CabinSerializer

from rest_framework import generics, status, views
from rest_framework.response import Response


class CabinList(generics.ListCreateAPIView):
    model = Cabin
    serializer_class = CabinSerializer

    def get_queryset(self):
        return Cabin.objects.all()

    def post(self, request, *args, **kwargs):
        # TODO: data validation
        serializer = CabinSerializer(data=request.data)

        if not serializer.is_valid():
            print("error in serializer validation")
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CabinDetail(generics.RetrieveAPIView):
    model = Cabin
    serializer_class = CabinSerializer
    queryset = Cabin.objects.all()


# TODO: patch endpoint for updating
class SubmitVoteView(views.APIView):
    def post(self, request, *args, **kwargs):
        name = request.data.get("name")
        email = request.data.get("email")
        cookie = request.COOKIES.get("userCookie")
        cabin_id = request.data.get("cabin_id")

        if not name or not email or not cookie:
            return Response({"error": "Invalid vote submission"}, status=400)

        user, created = User.objects.get_or_create(
            email=email, defaults={"name": name, "cookie": cookie}
        )
        if not created and user.cookie != cookie:
            return Response({"error": "Invalid user"}, status=400)

        cabin = Cabin.objects.filter(id=cabin_id).first()

        if user in cabin.votes.all():
            return Response(
                {"error": "You have already voted for this cabin"}, status=400
            )

        cabin.votes.add(user)
        cabin.save()

        return Response({"success": "Vote submitted"})
