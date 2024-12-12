# Login User
# This is the response that we will return
from rest_framework.response import Response
from rest_framework import status

# This is the model that we will use
from cabin_site.models.user import User

# This is the serializer that we will use
from cabin_site.serializers.auth import (
    LoginSerializer,
    RegisterSerializer,
)
from rest_framework.generics import (
    CreateAPIView,
)
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


# Register User
class RegisterView(CreateAPIView, TokenObtainPairView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
