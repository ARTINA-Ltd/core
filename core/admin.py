from django.contrib import admin
from core import models

admin.site.register(models.NFT)
admin.site.register(models.Order)
admin.site.register(models.NFTRating)
admin.site.register(models.Category)
admin.site.register(models.CollectionNFT)

