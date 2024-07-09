from cabin_site.serializers.user import UserSerializer
from rest_framework import serializers
from cabin_site.models.cabin import Cabin


class CabinSerializer(serializers.ModelSerializer):
    state = serializers.CharField(required=True, max_length=2)
    city = serializers.CharField(required=True)
    things_to_do = serializers.CharField(required=False, allow_blank=True)
    listing_url = serializers.URLField()
    image_url = serializers.URLField()
    votes = UserSerializer(many=True, read_only=True)
    price = serializers.IntegerField(required=True)

    class Meta:
        model = Cabin
        fields = [
            "id",
            "state",
            "city",
            "things_to_do",
            "listing_url",
            "image_url",
            "votes",
            "price"
        ]
