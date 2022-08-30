from django.db import models
from django.contrib.auth.models import User

class Permission(models.Model):
    name = models.CharField(max_length=10, verbose_name="نوع دسترسی", null=False, blank=False)

    def __str__(self):
        return self.name


class Role (models.Model):
    name = models.CharField(max_length=10, verbose_name="نقش", null=False, blank=False)
    permissions = models.ManyToManyField(Permission)

    def __str__(self):
        return self.name

    def get_permission(self, permission):
        return self.permissions.filter(name=permission).exists()


class Profile (models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    # TODO : adding FirstName and LastName as fields
    national_code = models.CharField(max_length=10, verbose_name="کدملی", null=True, blank=True)
    birthdate = models.CharField(max_length=10, verbose_name="تاریخ تولد", null=True, blank=True)
    phone_number = models.CharField(max_length=11, verbose_name="شماره تلفن", null=True, blank=True)
    cell_number = models.CharField(max_length=11, verbose_name="ثابت شماره تلفن", null=True, blank=True)
    address = models.TextField(max_length=200, verbose_name="آدرس", null=True, blank=True)
    national_code_picture = models.ImageField(verbose_name="عکس کارت ملی", upload_to="pictures of users", null=True,
                                              blank=True)
    image = models.ImageField(upload_to="pictures of profile", verbose_name="عکس پروفایل", null=True, blank=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username



### Functions needed for default Django User model

def get_artist_applications(self):
    nfts = self.nft_set.all()
    applications = []
    for nft in nfts:
        applications += nft.nftexs.filter(state='pending').all()
    return set(applications)


## TODO::still in progress should be completed......
def get_artist_exhibitions(self):
    nfts = self.nft_set.all()
    current_exhibitions = []
    for nft in nfts:
        current_exhibitions += list(filter(lambda x: not x.ex.has_expired()  ,nft.nftexs.filter(state='accepted').all()))
    



User.add_to_class('get_artist_applications',get_artist_applications)
