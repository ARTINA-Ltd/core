from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ArtistReviewRating
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ArtistRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistReviewRating
        fields = '__all__'        