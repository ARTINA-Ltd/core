from rest_framework import serializers
from exhibition import models
# from Account import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    # profile = Account.serializers.ProfileSerializer()

    class Meta:
        model = models.User
        fields = ['id','username']



class NumberSerializer(serializers.Serializer):
    numbers = serializers.ListField(
        child=serializers.IntegerField(min_value=0, max_value=9),
        min_length=5,
        max_length=5
    )



from rest_framework import serializers
from .models import NFT, Exhibition, Application , Category, Ticket
# CustomUser


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'


class NFTSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = NFT
        fields = '__all__'

class ExhibitionSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Exhibition
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    exhibition = serializers.PrimaryKeyRelatedField(queryset=Exhibition.objects.all())
    # artist = serializers.HiddenField(default=serializers.CurrentUserDefault())
    contract_accepted = serializers.BooleanField(required=True)
    nft = serializers.PrimaryKeyRelatedField(queryset=NFT.objects.all(), many=True)

    class Meta:
        model = Application
        fields = ['id', 'artist', 'exhibition', 'description', 'nft', 'contract_accepted']



    # def validate_nft(self, value):
    #     if value.in_exhibition:
    #         raise serializers.ValidationError("This NFT is currently part of an exhibition and cannot be used in another application.")
    #     return value

# class CustomUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ['id', 'username', 'email', 'first_name', 'last_name', 'balance']
