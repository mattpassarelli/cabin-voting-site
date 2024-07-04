from django.shortcuts import render
from cabin_site.models.trip import Trip
from cabin_site.serializers.trip import TripSerializer
from rest_framework import generics, status
from rest_framework.response import Response


class TripList(generics.ListCreateAPIView):
    model = Trip
    serializer_class = TripSerializer

    def get_queryset(self):
        return Trip.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = TripSerializer(data=request.data)

        if not serializer.is_valid():
            print("error in serializer validation")
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TripDetail(generics.RetrieveAPIView):
    model = Trip
    serializer_class = TripSerializer
    queryset = Trip.objects.all()
