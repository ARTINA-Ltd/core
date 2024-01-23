# permissions.py
from rest_framework import permissions

class UserRolePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user has the necessary role to access the view
        user = request.user
        role_name = user.profile.role.name
        if role_name == "user_one":
            return True
        return False
