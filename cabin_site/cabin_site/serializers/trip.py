from cabin_site.serializers.cabin import CabinSerializer
from rest_framework import serializers
from cabin_site.models import Trip, Cabin


class TripSerializer(serializers.ModelSerializer):
    cabins = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = ["id", "start_date", "end_date", "name", "last_modified", "cabins"]

    def to_internal_value(self, data):
        cleaned_data = {}
        for key, value in data.items():
            if isinstance(value, bytes):
                cleaned_data[key] = value.decode("utf-8", errors="replace")
            else:
                cleaned_data[key] = value
        return super().to_internal_value(cleaned_data)

    def get_cabins(self, obj):
        qs = Cabin.objects.filter(is_active=True, trip=obj)
        serializer = CabinSerializer(instance=qs, many=True)
        return serializer.data
