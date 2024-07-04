from cabin_site.models.cabin import Cabin
from cabin_site.serializers.cabin import CabinSerializer

from rest_framework import generics, status
from rest_framework.response import Response

class CabinList(generics.ListCreateAPIView):
    model = Cabin
    serializer_class = CabinSerializer

    def get_queryset(self):
        return Cabin.objects.all()
    
    def post(self, request, *args, **kwargs):
        # TODO: data validation
        serializer = CabinSerializer(data=request.data)

        if not serializer.is_valid():
            print("error in serializer validation")
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class CabinDetail(generics.RetrieveAPIView):
    model = Cabin
    serializer_class = CabinSerializer
    queryset = Cabin.objects.all()

# TODO: patch endpoint for updating