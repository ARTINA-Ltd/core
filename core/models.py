from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class NFT(models.Model):
    name = models.CharField(max_length=15, null=False, blank=False)
    owner = models.ForeignKey(User, null=False, blank=False, on_delete=models.CASCADE)
    creator = models.CharField(max_length=15, null=False, blank=False)
    date = models.DateTimeField(verbose_name="تاریخ", auto_now=True)
    lastPrice = models.CharField(max_length=15, null=False, blank=False)


class Transaction(models.Model):
    nft = models.ForeignKey(NFT, on_delete=models.CASCADE)
    seller = models.CharField(max_length=15, null=False, blank=False)
    buyer = models.CharField(max_length=15, null=False, blank=False)
    date = models.DateTimeField(verbose_name="تاریخ", auto_now=True)


class Wallet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.CharField(verbose_name="wallet address", max_length=100)


class Order(models.Model):
    nft = models.ManyToManyField(NFT)
    bidder = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    fee = models.IntegerField(verbose_name="قیمت", null=False, blank=False)
    date = models.DateTimeField(verbose_name="تاریخ", auto_now=True)
