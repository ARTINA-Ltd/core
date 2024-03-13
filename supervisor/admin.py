from django.contrib import admin
from core import models

# Register your models here.
admin.site.register(models.SupervisorTicket)
admin.site.register(models.DocumentApproval)
admin.site.register(models.RejectionMessage)

