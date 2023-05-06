from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ArtistReviewRating, Profile, UserTicket , PhoneVerification
from django.contrib.auth import authenticate


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        profile = Profile(user=user)
        profile.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])

        if not user:
            raise serializers.ValidationError("Incorrect username or password")

        if not user.is_active:
            raise serializers.ValidationError("User account is disabled")

        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'date_joined']


class ArtistRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistReviewRating
        fields = '__all__'        


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTicket
        fields = '__all__'


class PhoneVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneVerification
        fields = ['user','id','phone_number','verification_code']

