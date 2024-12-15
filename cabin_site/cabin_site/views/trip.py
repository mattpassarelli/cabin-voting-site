from rest_framework import generics, status
from cabin_site.models import Trip
from cabin_site.serializers import TripSerializer
from rest_framework.response import Response


class TripList(generics.ListCreateAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    def get_queryset(self):
        return Trip.objects.filter(is_active=True)


class TripDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    def get(self, request, pk):
        try:
            trip = Trip.objects.get(id=pk)
            if trip is None:
                return Response(status=status.HTTP_404_NOT_FOUND)

            serializer = TripSerializer(trip)
            return Response(status=status.HTTP_200_OK, data=serializer.data)

        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST, data=str(e))

    def delete(self, request, pk):
        try:
            trip = Trip.objects.get(id=pk)
            if trip is None:
                return Response(status=status.HTTP_404_NOT_FOUND)

            trip.is_active = False
            trip.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST, data=str(e))
