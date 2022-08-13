from django.db import models
from django.contrib.auth.models import User


class Permission(models.Model):
    name = models.CharField(max_length=10, verbose_name="نقش", null=False, blank=False)


class Role (models.Model):
    name = models.CharField(max_length=10, verbose_name="نقش", null=False, blank=False)
    permissions = models.ManyToManyField(Permission)

    def get_permission(self, permission):
        return self.permissions.filter(name=permission).exists()


class Profile (models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    nationalcode = models.CharField(max_length=10, verbose_name="کدملی", null=True, blank=True)
    birthdate = models.CharField(max_length=10, verbose_name="تاریخ تولد", null=True, blank=True)
    phonenumber = models.CharField(max_length=11, verbose_name="شماره تلفن", null=True, blank=True)
    cellnumber = models.CharField(max_length=11, verbose_name="ثابت شماره تلفن", null=True, blank=True)
    address = models.TextField(max_length=200, verbose_name="آدرس", null=True, blank=True)
    national_code_picture = models.ImageField(verbose_name="عکس کارت ملی", upload_to="pictures of users", null=True,
                                              blank=True)
    image = models.ImageField(upload_to="عکس پروفایل", verbose_name="عکس پروفایل", null=True, blank=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
