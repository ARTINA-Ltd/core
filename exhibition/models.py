from django.db import models
from django.contrib.auth.models import User
from core.models import NFT
from django.utils import timezone
from django.core import validators
from datetime import datetime
from datetime import timedelta
import pytz
from django.db.models import Avg


class Exhibition(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    marketName = models.CharField(max_length=15, null=False, blank=False)
    image = models.ImageField(upload_to="./static/pictures of Exhibitions", verbose_name="Exhibition",
                              null=True, blank=True)
    start_date = models.DateTimeField(verbose_name="تاریخ شروع", default=timezone.now)
    end_date = models.DateTimeField(verbose_name="تاریخ پایان", default=timezone.now)
    # contract = models.TextField(null=False)
    # TODO: add word or pdf file to this model in contract field later
    # description = models.TextField()

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

class ExReviewRating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exhibition = models.ForeignKey(Exhibition, on_delete=models.CASCADE, related_name='exhibition')
    rating = models.IntegerField(default=5, validators=[validators.MaxValueValidator(5), validators.MinValueValidator(0)])
    review = models.TextField(blank=True)

    def TotalCal():
        avg = models.ExReviewRating.objects.aggregate(Avg('rating'))
        return avg 

    def __str__(self):
        return f'{self.exhibition} Get Rank : ( {self.rating} ) from {self.user.username}'

class NFtEx(models.Model):
    nfts = models.ManyToManyField(NFT, related_name='nftexs')
    ex = models.ForeignKey(Exhibition, on_delete=models.CASCADE, related_name='nftexs')
    date = models.DateTimeField(verbose_name="تاریخ", auto_now=True)
    commission = models.IntegerField(default=1, null=False, blank=False, validators=[validators.MaxValueValidator(100),
                                                                                     validators.MinValueValidator(1)])
    state = models.CharField(max_length=12, null=False, blank=False, choices=[('pending', 'pending'),
                                                                              ('accepted', 'accepted'),
                                                                              ('rejected', 'rejected')],
                             default='pending')

    def __str__(self):
        return f'{self.nfts.name} in {self.ex.marketName}'

    
class Transaction(models.Model):
    nft = models.ForeignKey(NFT, on_delete=models.CASCADE, default=1)
    nftex = models.ForeignKey(NFtEx, on_delete=models.CASCADE)
    lastPrice = models.IntegerField(verbose_name='آخرین قیمت', null=False, blank=False, default=0)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='as_seller_transactions')
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='as_buyer_transactions')
    date = models.DateTimeField(verbose_name="تاریخ")

    def __str__(self):
        return f'{self.nftex} sold by {self.seller} to {self.buyer}'
