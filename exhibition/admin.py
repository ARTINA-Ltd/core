from django.contrib import admin
from exhibition import models


admin.site.register(models.Exhibition)
admin.site.register(models.NFtEx)
admin.site.register(models.Transaction)