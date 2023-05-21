from django.contrib import admin
from exhibition import models


admin.site.register(models.Exhibition)
admin.site.register(models.Ticket)
admin.site.register(models.Application)
admin.site.register(models.Category)
