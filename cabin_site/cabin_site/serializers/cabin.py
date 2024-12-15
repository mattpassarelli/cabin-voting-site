from cabin_site.serializers.user import UserSerializer
from rest_framework import serializers
from cabin_site.models import Cabin


class CabinSerializer(serializers.ModelSerializer):
    votes = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Cabin
        fields = [
            "id",
            "state",
            "city",
            "things_to_do",
            "listing_url",
            "image_url",
            "price",
            "votes",
            "submitter",
            "trip",
        ]

    def to_internal_value(self, data):
        cleaned_data = {}
        for key, value in data.items():
            if isinstance(value, bytes):
                cleaned_data[key] = value.decode("utf-8", errors="replace")
            else:
                cleaned_data[key] = value
        return super().to_internal_value(cleaned_data)
