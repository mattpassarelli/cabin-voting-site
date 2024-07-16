from cabin_site.serializers.cabin import CabinSerializer
from rest_framework import serializers
from cabin_site.models.trip import Trip


class TripSerializer(serializers.ModelSerializer):

    cabins = CabinSerializer(many=True, read_only=True)
    final_round_cabins = CabinSerializer(many=True, read_only=True)

    class Meta:
        model = Trip
        fields = "__all__"
