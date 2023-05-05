from django.db import models
from django.contrib.auth.models import User
from exhibition.serializers import ExhibitionSerializer
from core.serializers import NFTSerializer
from django.core import validators
from django.db.models import Avg
from kavenegar import KavenegarAPI
import random
import requests
import time


class Permission(models.Model):
    name = models.CharField(max_length=10, verbose_name="نوع دسترسی", null=True, blank=False, default="basic")

    def __str__(self):
        return self.name


class Role(models.Model):
    name = models.CharField(max_length=10, verbose_name="نقش", null=True, blank=False, default="user_zero")
    permissions = models.ManyToManyField(Permission)

    def __str__(self):
        return self.name

    def get_permission(self, permission):
        return self.permissions.filter(name=permission).exists()


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(max_length=15, null=True, blank=False)
    last_name = models.CharField(max_length=25, null=True, blank=False)
    national_code = models.CharField(max_length=10, verbose_name="کدملی", null=True, blank=False,
                                     validators=[validators.RegexValidator(regex='^[0-9]{10}$',
                                                                           message='کد ملی باید 10 رقمی باشد',
                                                                           code='invalid_national_code')])
    birthdate = models.CharField(max_length=10, verbose_name="تاریخ تولد", null=True, blank=False)
    phone_number = models.CharField(max_length=11, verbose_name="شماره تلفن", null=True, blank=False,
                                    validators=[validators.RegexValidator(regex='^[0-9]{11}$',
                                                                          message='شماره تلفن باید 11 رقمی باشد',
                                                                          code='invalid_phone_number')])
    phone_number_verified = models.BooleanField(default=False)
    cell_number = models.CharField(max_length=11, verbose_name="شماره تلفن ثابت", null=True, blank=False)
    address = models.TextField(max_length=200, verbose_name="آدرس", null=True, blank=False)
    national_card_picture = models.ImageField(verbose_name="عکس کارت ملی", upload_to="./static/PicturesOfNationalCard",
                                              null=True,
                                              blank=False,
                                              default="static/PicturesOfNationalCard/default.png",
                                              )
    profile_picture = models.ImageField(upload_to="./static/PicturesOfProfile", verbose_name="عکس پروفایل",
                                        null=True, blank=False, default="static/PicturesOfProfile/default.png",)
    # email = models.EmailField(max_length=50, verbose_name="ایمیل", null=True, blank=False)
    email_verified = models.BooleanField(default=False)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, default=1)

    # def __str__(self):
    #     return self.user.username + " " + self.first_name + " " + self.last_name + " " + self.national_code + " "\
    #            + self.email + " "


class ArtistReviewRating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artist = models.ForeignKey(User, on_delete=models.CASCADE, related_name='artist')
    rating = models.IntegerField(default=5, validators=[validators.MaxValueValidator(5),
                                                        validators.MinValueValidator(0)])

    def total_cal(self):
        avg = ArtistReviewRating.objects.aggregate(Avg('rating'))
        return avg

    def __str__(self):
        return f'{self.artist.username} Get Rank : ( {self.rating} )  from {self.user.username}'
# TODO : Functions needed for default Django User model


def get_artist_applications(self):
    nfts = self.nft_set.all()
    applications = []
    for nft in nfts:
        applications += nft.nftexs.filter(state='pending').all()
    return set(applications)
# TODO: check for future delete, handled in front-end


def is_artist(self):
    try:
        profile = self.profile
        if profile.role.name == 'artist':
            return True
    except:
        return False


User.add_to_class('is_artist', is_artist)
User.add_to_class('get_artist_applications', get_artist_applications)


class UserTicket(models.Model):
    ticket_id = models.IntegerField(verbose_name="ticket_id", default=1000)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.CharField(max_length=70, verbose_name="موضوع", null=True, blank=False)
    date = models.DateTimeField(auto_now=True)
    text = models.TextField(max_length=200, verbose_name="متن", null=True, blank=False)


class PhoneVerification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20)
    verification_code = models.CharField(max_length=6)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


def send_verification_code(phone_number, user):
    # Generate a random 6-digit code
    verification_code = random.randint(100000, 999999)

    # Send the SMS via Kavenegar API
    # The URL IS like : https://api.kavenegar.com/v1/{API-KEY}/verify/lookup.json
    response = requests.post(
        f"https://api.kavenegar.com/v1/"
        f"4B2B714533707372774D45784D46535A43413648743058714E52345243614E53674947356C6B326B7737673D"
        f"/verify/lookup.json",
        data={
            "receptor": phone_number,
            "token": verification_code,
            "template": "SMSVerify"
        }
    )

    if response.status_code == 200:
        # Create a new PhoneVerification object to store the code
        PhoneVerification.objects.create(user=user, phone_number=phone_number, verification_code=verification_code,
                                         verified=False)
        return verification_code
    else:
        # Handle error response
        return None


# send_verification_code("09387731214", User.objects.get(username="aria"))


# def get_artist_exhibitions(self):
#     nfts = self.nft_set.all()
#     data = []
#     current_nftexs = []
#     for nft in nfts:
#         current_nftexs += filter(lambda x: not x.ex.has_expired(), nft.nftexs.filter(state='accepted').all())
#     current_nftexs = set(current_nftexs)
#     for nftex in current_nftexs:
#         info = {}
#         info['exhibition'] = ExhibitionSerializer(nftex.ex).data
#         my_nfts = list(filter(lambda x: x.owner == self, nftex.nfts.all()))
#         info['your_nfts'] = NFTSerializer(my_nfts, many=True).data
#         info['sells'] = 'Exhibition is in progress yet.'
#         data.append(info)
#     prevs_exhibitions = set(map(lambda x: x.nftex.ex, self.as_seller_transactions.all()))
#     for exhibition in prevs_exhibitions:
#         info = {}
#         info['exhibition'] = ExhibitionSerializer(exhibition).data
#         prevs_nftexs = exhibition.nftexs.filter(state='accepted').all()
#         transactions = []
#         for nftex in prevs_nftexs:
#             transactions += nftex.transaction_set.all()
#         print(transactions)
#         transactions = list(filter(lambda x: x.seller == self, transactions))
#         profit = []
#         for transaction in transactions:
#             profit.append({'nft': NFTSerializer(transaction.nft).data,
#                            'profit': transaction.lastPrice * (transaction.nftex.commission/100)})
#         info['sells'] = profit
#         data.append(info)
#     return data
#
# TODO : need improvement

# User.add_to_class('get_artist_exhibitions', get_artist_exhibitions)
