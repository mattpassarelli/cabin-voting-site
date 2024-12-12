from django.urls import path, re_path, include
from cabin_site.views.user import UserList, UserDetail

urlpatterns = [
    path("<uuid:user_id>/", UserDetail.as_view(), name="user_detail"),
    re_path(r"^$", UserList.as_view(), name="user_list"),
]
