from rest_framework import serializers
from cabin_site.models.cabin import Cabin

class CabinSerializer(serializers.ModelSerializer):
    state = serializers.CharField(required=True, max_length=2)
    city = serializers.CharField(required=True)
    things_to_do = serializers.CharField()
    listing_url = serializers.URLField()
    image_url = serializers.URLField()

    class Meta:
        model = Cabin
        fields = [
            'id',
            'state',
            'city',
            'things_to_do',
            'listing_url',
            'image_url'
        ]