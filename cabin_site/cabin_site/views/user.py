from rest_framework import generics
from cabin_site.models import User
from cabin_site.serializers import UserSerializer
from rest_framework.response import Response

import uuid


# Utility function to generate a unique cookie
def generate_cookie():
    return str(uuid.uuid4())


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        cookie = request.COOKIES.get("userCookie")

        if cookie:
            return Response("You already have a stored cookie and account")
        else:
            cookie = generate_cookie()

        request.data._mutable = True
        request.data["unique_id"] = cookie
        request.data._mutable = False

        check_user = User.objects.filter(
            name=request.data["name"], email=request.data["email"]
        ).first()

        if check_user:
            response = Response(
                "An account with these details already exists. Refreshing Cookie..."
            )

            new_cookie = generate_cookie()
            response.set_cookie("userCookie", new_cookie, max_age=365 * 24 * 60 * 60)
            check_user.unique_id = new_cookie
            check_user.save()

            return response

        response = super().create(request, *args, **kwargs)
        response.set_cookie(
            "userCookie", cookie, max_age=365 * 24 * 60 * 60
        )  # Cookie lasts 1 year
        return response


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
