from rest_framework import serializers
from cabin_site.models.user import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "user_id",
            "username",
            "email",
            "first_name",
            "last_name",
            "created",
            "last_updated",
        ]

    def to_internal_value(self, data):
        cleaned_data = {}
        for key, value in data.items():
            if isinstance(value, bytes):
                cleaned_data[key] = value.decode("utf-8", errors="replace")
            else:
                cleaned_data[key] = value
        return super().to_internal_value(cleaned_data)
