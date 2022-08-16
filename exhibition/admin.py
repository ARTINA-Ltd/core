from django.contrib import admin
from .models import Exhibition, NFtEx


class ExhibitionSettings(admin.ModelAdmin):
    list_display = ('marketName', 'user', 'start_date', 'end_date')


admin.site.register(Exhibition, ExhibitionSettings)
admin.site.register(NFtEx)
