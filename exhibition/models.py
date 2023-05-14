from django.db import models
from django.contrib.auth.models import User
from core.models import NFT
from django.utils import timezone
from django.core import validators
from datetime import datetime
from datetime import timedelta
import pytz
from django.db.models import Avg
from django.core.validators import FileExtensionValidator


class Category (models.Model):
    name = models.CharField(max_length=25, verbose_name="دسته بندی", null=False, blank=False, default="سایر")

    def __str__(self):
        return self.name


class Exhibition(models.Model):
    exhibition_id = models.IntegerField(verbose_name="ID", default=1000, null=False, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    marketName = models.CharField(max_length=35, null=False, blank=False)
    image = models.ImageField(upload_to="./static/pictures of Exhibitions", verbose_name="Exhibition",
                              null=True, blank=True)
    start_date = models.DateTimeField(verbose_name="تاریخ شروع", default=timezone.now)
    end_date = models.DateTimeField(verbose_name="تاریخ پایان", default=timezone.now)
    description = models.TextField(null=True, blank=True)
    ticket = models.BooleanField(null=True, default=False)
    contract = models.FileField(upload_to="./static/contract files", null=True, blank=False,
                                validators=[FileExtensionValidator(allowed_extensions=["pdf"])])
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    
    def has_ticket(self):
        if self.ticket is None:
            return False
        else:
            return True
    
    def has_expired(self):
        return datetime.now(tz=pytz.timezone('Asia/Tehran')) > self.end_date

    def has_started(self):
        return datetime.now(tz=pytz.timezone('Asia/Tehran')) > self.start_date
    
    def __str__(self):
        return f'{self.marketName} by {self.user.username}'

    # Note: Artist can not apply for the exhibition 2 days before start date or later
    def can_apply(self):
        if self.has_expired():
            return False
        elif datetime.now(tz=pytz.timezone('Asia/Tehran')) > self.start_date - timedelta(days=2):
            return False
        else:
            return True

    # TODO : we need the `has_requested` function to check if a user has requested for a exhibition or not before,
    #   change the `is_accepted` to the state base in NFtEx object

    def get_artists(self):
        artists = set(map(lambda x: x.nfts.first().owner, self.nftexs.filter(state='accepted').all()))
        return artists
    
    def has_artist_pending_request(self, artist):
        requests = list(map(lambda x: x.nfts.first().owner == artist, self.nftexs.filter(state='pending')))
        if len(requests):
            return True
        else:
            return False


class Ticket(models.Model):
    ticket_id = models.IntegerField(verbose_name="ticket_id", default=1000)
    exhibition_id = models.ForeignKey(Exhibition, on_delete=models.CASCADE, related_name='tickets')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    price = models.IntegerField(null=False, blank=False, default=20000, validators=[validators.MinValueValidator(5000)])
    ticket_count = models.IntegerField(null=True, blank=True, default=100)


class NFtEx(models.Model):
    nfts = models.ManyToManyField(NFT, related_name='nftexs')
    exhibition = models.ForeignKey(Exhibition, on_delete=models.CASCADE, related_name='nftexs')
    date = models.DateTimeField(verbose_name="تاریخ", auto_now=True)
    commission = models.IntegerField(default=1, null=False, blank=False, validators=[validators.MaxValueValidator(100),
                                                                                     validators.MinValueValidator(1)])
    state = models.CharField(max_length=12, null=False, blank=False, choices=[('pending', 'pending'),
                                                                              ('accepted', 'accepted'),
                                                                              ('rejected', 'rejected')],
                             default='pending')
    feedback = models.TextField(max_length=200, null=True, blank=True)
    
    def get_owner(self):
        return self.nfts.first().owner

    def __str__(self):
        return f'{self.nfts.name} in {self.exhibition.marketName}'

# class applications (models.Model):
      
class Transaction(models.Model):
    nft = models.ForeignKey(NFT, on_delete=models.CASCADE, default=1)
    nftex = models.ForeignKey(NFtEx, on_delete=models.CASCADE)
    lastPrice = models.IntegerField(verbose_name='آخرین قیمت', null=False, blank=False, default=0)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='as_seller_transactions')
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='as_buyer_transactions')
    date = models.DateTimeField(verbose_name="تاریخ")

    def __str__(self):
        return f'{self.nftex} sold by {self.seller} to {self.buyer}'
