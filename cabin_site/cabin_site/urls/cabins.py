from django.urls import path, re_path, include
from cabin_site.views.cabin import CabinList, CabinDetail, CabinVote

urlpatterns = [
    path("<int:cabin_id>/", CabinDetail.as_view(), name="cabin_detail"),
    path("<int:cabin_id>/vote/", CabinVote.as_view(), name="cabin_vote"),
    re_path(r"^$", CabinList.as_view(), name="cabin_list"),
]
