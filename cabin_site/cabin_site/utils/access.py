from rest_framework import permissions
from cabin_site.models.user import User


class IsCabinSubmitterOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow read permissions to anyone
        if request.method in permissions.SAFE_METHODS:
            return True

        # Allow write permissions only to the owner of the object
        print(obj.submitter)
        user = User.objects.filter(email=request.user).first()
        print(user)
        return obj.submitter == user
