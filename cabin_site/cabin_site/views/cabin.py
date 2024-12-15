from rest_framework import generics, status
from cabin_site.models import Cabin
from cabin_site.serializers import CabinSerializer
from rest_framework.response import Response


class CabinList(generics.ListCreateAPIView):
    queryset = Cabin.objects.all()
    serializer_class = CabinSerializer


class CabinDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cabin.objects.all()
    serializer_class = CabinSerializer


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
