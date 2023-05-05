from django.contrib import admin
from Account import models


admin.site.register(models.Permission)
admin.site.register(models.Role)
admin.site.register(models.Profile)
admin.site.register(models.ArtistReviewRating)
admin.site.register(models.UserTicket)
admin.site.register(models.PhoneVerification)