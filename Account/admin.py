from django.contrib import admin
from .models import Permission, Role, Profile


admin.site.register(Permission)
admin.site.register(Role)
admin.site.register(Profile)
