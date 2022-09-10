from django.contrib import admin
from core import models

admin.site.register(models.NFT)
admin.site.register(models.Order)
admin.site.register(models.Wallet)
admin.site.register(models.NFTReviewRating)

