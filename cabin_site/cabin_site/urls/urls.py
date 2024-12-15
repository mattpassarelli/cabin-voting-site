from django.urls import include, re_path, path

from cabin_site.urls import users, auth, trips, cabins

urlpatterns = [
    path("users/", include(users)),
    path("auth/", include(auth)),
    path("trips/", include(trips)),
    path("cabins/", include(cabins)),
]
