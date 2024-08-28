from django.contrib import admin
from Account import models


admin.site.register(models.Permission)
admin.site.register(models.NotifyUser)
admin.site.register(models.Msg)
admin.site.register(models.Role)
admin.site.register(models.Profile)
admin.site.register(models.ArtistReviewRating)
admin.site.register(models.TicketUser)
admin.site.register(models.UserBalance)
admin.site.register(models.TransactionCurrency)
admin.site.register(models.PhoneVerification)
admin.site.register(models.EmailVerification)
admin.site.register(models.Wallet)
admin.site.register(models.ARTINA_Ballance)

admin.site.register(models.Transaction)
admin.site.register(models.Payment)
admin.site.register(models.Affiliate)




