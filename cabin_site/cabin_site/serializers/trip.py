from rest_framework import serializers
from cabin_site.models.trip import Trip

class TripSerializer(serializers.ModelSerializer):
    year = serializers.IntegerField(required=True)
    start_date = serializers.DateField(required=True)
    end_date = serializers.DateField(required=True)
    date_created = serializers.DateTimeField(read_only=True)
    last_modified = serializers.DateTimeField(read_only=True)
    cabins = serializers.RelatedField(read_only=True)

    class Meta:
        model = Trip
        fields = [
            'id',
            'year',
            'start_date',
            'end_date',
            'date_created',
            'last_modified',
            'cabins'
        ]

    