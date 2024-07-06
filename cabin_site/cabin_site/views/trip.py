from cabin_site.models.trip import Trip
from cabin_site.serializers.trip import TripSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from datetime import datetime


class TripList(generics.ListCreateAPIView):
    model = Trip
    serializer_class = TripSerializer

    def get_queryset(self):
        return Trip.objects.all()

    def post(self, request, *args, **kwargs):
        # TODO: data validation
        serializer = TripSerializer(data=request.data)

        trip_check = Trip.objects.filter(year=request.data["year"]).exists()

        if trip_check:
            print(f"Duplicate trip with year {request.data['year']} found.")
            return Response(
                f"A trip with the year {request.data['year']} already exists",
                status=status.HTTP_409_CONFLICT,
            )

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

    # TODO: trip update to add cabins
    def patch(self, request, pk):
        print(f"Updating Trip {pk}")
        serializer = TripSerializer(data=request.data)

        if not serializer.is_valid():
            print("PATCH data for trip update is invalid")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        trip = Trip.objects.filter(id=pk).first()
        new_year = request.data.get("year", None)
        new_start = request.data.get("start_date", None)
        new_end = request.data.get("end_date", None)

        if new_year and new_year != trip.year:
            trip.year = new_year
            trip.last_modified = datetime.now()
        if new_start and new_start != trip.start_date:
            trip.start_date = new_start
            trip.last_modified = datetime.now()
        if new_end and new_end != trip.end_date:
            trip.end_date = new_end
            trip.last_modified = datetime.now()

        trip.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )

    def delete(self, request, pk):
        print(f"Deleting Trip {pk}")

        Trip.objects.filter(id=pk).first().delete()

        return Response(status=status.HTTP_200_OK)
