# permissions.py
from rest_framework import permissions

class UserRolePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user has the necessary role to access the view
        user = request.user
        role_name = user.profile.role.name
        if role_name == "user_one":
            # Allow access for users with the role 'uzer_one'
            return True
            # elif role_name == "user_zero" and view.action in ['list', 'retrieve', 'create']:
            #     # Allow access for users with the role 'user_zero' for specific actions
            #     return False
        return False
