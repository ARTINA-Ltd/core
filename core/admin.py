from django.contrib import admin
from .models import NFT, Transaction, Wallet, Order


admin.site.register(NFT)
admin.site.register(Transaction)
admin.site.register(Wallet)
admin.site.register(Order)
