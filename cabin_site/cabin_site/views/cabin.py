from rest_framework import generics, status
from cabin_site.models import Cabin
from cabin_site.serializers import CabinSerializer
from rest_framework.response import Response


class CabinList(generics.ListCreateAPIView):
    queryset = Cabin.objects.all()
    serializer_class = CabinSerializer


class CabinDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cabin.objects.all()
    serializer_class = CabinSerializer
