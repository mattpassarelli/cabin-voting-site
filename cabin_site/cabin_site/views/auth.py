# Login User
# This is the response that we will return
from rest_framework.response import Response

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
class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
