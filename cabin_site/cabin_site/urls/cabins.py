from django.urls import path, re_path, include
from cabin_site.views.cabin import CabinList, CabinDetail

urlpatterns = [
    path("<uuid:trip_id>/", CabinDetail.as_view(), name="cabin_detail"),
    re_path(r"^$", CabinList.as_view(), name="cabin_list"),
]
