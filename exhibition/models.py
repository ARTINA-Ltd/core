from django.db import models
from django.contrib.auth.models import User
from core.models import NFT
from django.utils import timezone
from django.core import validators


class Exhibition(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    marketName = models.CharField(max_length=15, null=False, blank=False)
    image = models.ImageField(upload_to="./pictures of Exhibitions", verbose_name="Exhibition", null=True, blank=True)
    start_date = models.DateTimeField(verbose_name="تاریخ شروع", default=timezone.now)
    end_date = models.DateTimeField(verbose_name="تاریخ پایان", default=timezone.now)
    # contract = models.TextField(null=False)
    # TODO: add word or pdf file to this model in contract field later
    # description = models.TextField()

    def __str__(self):
        return f'{self.marketName} by {self.user.username}' 


class NFtEx(models.Model):
    nfts = models.ManyToManyField(NFT, related_name='nftexs')
    ex = models.ForeignKey(Exhibition, on_delete=models.CASCADE, related_name='nftex')
    date = models.DateTimeField(verbose_name="تاریخ", auto_now=True)
    commission = models.IntegerField(default=1, null=False, validators=[validators.MaxValueValidator(100),
                                                                        validators.MinValueValidator(1)])
    is_nft_viewed_by_exhibitor = models.BooleanField(default=False)
    is_nft_accepted_by_exhibitor = models.BooleanField(default=False)

class Transaction(models.Model):
    nftex = models.ForeignKey(NFtEx, on_delete=models.CASCADE)
    lastPrice = models.IntegerField(verbose_name='آخرین قیمت', null=False, blank=False, default=0)
    seller = models.CharField(max_length=15, null=False, blank=False)
    buyer = models.CharField(max_length=15, null=False, blank=False)
    date = models.DateTimeField(verbose_name="تاریخ", auto_now=True)
