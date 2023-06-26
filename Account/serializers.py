from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
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


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['profile_picture', 'first_name', 'last_name']

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields =  '__all__'
        # read_only_fields = ['ticket_id']
        
class PhoneVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneVerification
        fields = ['user','id','phone_number','verification_code']



class UserBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBalance
        fields = ('id', 'user', 'rial_available_balance', 'rial_untradable_balance', 'eth_balance')

class UserTurnoverSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTurnover
        fields = ('id', 'user', 'transaction_type', 'transaction_currency', 'transaction_value')


from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
