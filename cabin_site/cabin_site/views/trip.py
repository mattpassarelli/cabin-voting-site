from cabin_site.models.cabin import Cabin
from cabin_site.models.trip import Trip
from cabin_site.serializers.trip import TripSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from datetime import datetime
from django.db.models import Count
import random


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


class TripFinalRound(generics.RetrieveAPIView):
    model = Trip
    serializer_class = TripSerializer
    queryset = Trip.objects.all()

    def post(self, request, pk):
        print(f"Finalizing Trip {pk}")
        serializer = TripSerializer(data=request.data)

        trip = Trip.objects.filter(id=pk).first()

        if trip.in_final_voting_round:
            trip.in_final_voting_round = False

            for cabin in trip.final_round_cabins.all():
                cabin.delete()

            trip.final_round_cabins.clear()
        else:
            trip.in_final_voting_round = True

        if trip.in_final_voting_round:
            cabins_with_votes = (
                trip.cabins.annotate(vote_count=Count("votes"))
                .filter(vote_count__gt=0)
                .order_by("-vote_count")
            )

            top_cabins = []
            for cabin in cabins_with_votes:
                if cabin.vote_count > 0:
                    if len(top_cabins) < 2:
                        top_cabins.append(cabin)
                    else:
                        if (
                            cabin.vote_count > 0
                            and cabin.vote_count == top_cabins[-1].vote_count
                        ):
                            top_cabins.append(cabin)
                        else:
                            break

            cloned_cabins = []
            for cabin in top_cabins:
                cloned_cabin = Cabin(
                    state=cabin.state,
                    city=cabin.city,
                    things_to_do=cabin.things_to_do,
                    listing_url=cabin.listing_url,
                    image_url=cabin.image_url,
                )
                cloned_cabin.save()
                cloned_cabins.append(cloned_cabin)

            trip.final_round_cabins.set(cloned_cabins)

        trip.save()

        return Response(serializer.to_representation(trip), status=status.HTTP_200_OK)
