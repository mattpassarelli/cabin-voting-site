"""
URL configuration for cabin_site project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import routers
from cabin_site.views import trip, cabin, user

router = routers.DefaultRouter()

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("trips/", trip.TripList.as_view()),
    path("trips/<int:pk>/finalize/", trip.TripFinalRound.as_view()),
    path("trips/<int:pk>/cabins/", trip.TripDetail.as_view()),
    path("trips/<int:pk>/", trip.TripDetail.as_view()),  # Corrected line
    path("cabins/", cabin.CabinList.as_view()),
    path("cabins/<int:pk>/", cabin.CabinDetail.as_view()),
    path("cabins/<int:pk>/vote/", cabin.SubmitVoteView.as_view()),
    path("users/", user.UserList.as_view(), name="user-list-create"),
    path("users/<int:pk>/", user.UserDetail.as_view(), name="user-detail"),
]
