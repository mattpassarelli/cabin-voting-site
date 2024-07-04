from rest_framework import generics, status
from cabin_site.models import User
from cabin_site.serializers import UserSerializer
from rest_framework.response import Response


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        check_user = User.objects.filter(name=request.data["name"]).first()

        if check_user:
            return Response(
                "This user aleady exists",
                status=status.HTTP_409_CONFLICT,
            )

        new_user = User.objects.create(name=request.data["name"])
        response = Response(f"Created User: {new_user}")

        return response


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
