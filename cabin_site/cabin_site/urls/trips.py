from django.urls import path, re_path, include
from cabin_site.views.trip import TripList, TripDetail

urlpatterns = [
    path("<int:pk>/", TripDetail.as_view(), name="trip_detail"),
    re_path(r"^$", TripList.as_view(), name="trip_list"),
]
