from django.contrib import admin
from game import models

admin.site.register(models.UserGameProfile)
admin.site.register(models.GameSession)
admin.site.register(models.Game)
admin.site.register(models.CheatCode)

