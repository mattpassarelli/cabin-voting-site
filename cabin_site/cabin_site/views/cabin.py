from rest_framework import generics, status
from cabin_site.models import Cabin, Trip, User
from cabin_site.serializers import CabinSerializer
from rest_framework.response import Response

from cabin_site.utils.access import IsCabinSubmitterOrReadOnly


class CabinList(generics.ListCreateAPIView):
    queryset = Cabin.objects.all()
    serializer_class = CabinSerializer

    def post(self, request, *args, **kwargs):
        try:
            print(request.user)
            trip = Trip.objects.get(id=request.data.get("trip"))
            user = User.objects.get(email=request.user)
            cabin = Cabin.objects.create(
                state=request.data.get("state"),
                city=request.data.get("city"),
                things_to_do=request.data.get("things_to_do"),
                listing_url=request.data.get("listing_url"),
                image_url=request.data.get("image_url"),
                price=request.data.get("price"),
                trip=trip,
                submitter=user,
            )
            cabin.save()

            serializer = CabinSerializer(cabin)
            return Response(status=status.HTTP_201_CREATED, data=serializer.data)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST, data=str(e))


class CabinDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cabin.objects.all()
    serializer_class = CabinSerializer
    permission_classes = [IsCabinSubmitterOrReadOnly]

    def delete(self, request, pk):
        try:
            cabin = Cabin.objects.get(id=pk)
            if cabin is None:
                return Response(status=status.HTTP_404_NOT_FOUND)

            cabin.is_active = False
            cabin.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST, data=str(e))


class CabinVote(generics.RetrieveUpdateAPIView):
    queryset = Cabin.objects.all()
    serializer_class = CabinSerializer

    def post(self, request, cabin_id):
        cabin = Cabin.objects.filter(id=cabin_id).first()

        if cabin is None:
            return Response(
                status=status.HTTP_404_NOT_FOUND,
                data="A Cabin with that ID does not exist",
            )

        if request.user in cabin.votes.all():
            cabin.votes.remove(request.user)
        else:
            cabin.votes.add(request.user)

        cabin.save

        serializer = CabinSerializer(cabin)

        return Response(status=status.HTTP_204_NO_CONTENT, data=serializer.data)
