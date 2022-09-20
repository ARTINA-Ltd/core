from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ArtistReviewRating, Profile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','first_name','last_name','email','date_joined']


class ArtistRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistReviewRating
        fields = '__all__'        


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
