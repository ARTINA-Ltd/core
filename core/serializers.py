from rest_framework import serializers
from core import models
from .models import Category, CollectionNFT
from django.contrib.auth.models import User

from .models import PDF, NFT


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ['nft', 'bidder', 'fee', 'status', 'date']
        read_only_fields = ['date']


class CollectionNFTSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollectionNFT
        fields = ('name',)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name',)

class NFTSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    collection = CollectionNFTSerializer()

    class Meta:
        model = NFT
        fields = '__all__'

class NFTRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.NFTRating
        fields = ['user', 'nft', 'like', 'review']


class OwnerWithLikesSerializer(serializers.ModelSerializer):
    likes_count = serializers.IntegerField()

    class Meta:
        model = User
        fields = ['id', 'username', 'likes_count']
        
class MyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MyImage
        fields = ('id', 'image')




class PDFSerializer(serializers.ModelSerializer):
    class Meta:
        model = PDF
        fields = ('id', 'title', 'file', 'url')
        read_only_fields = ('url',)

    def create(self, validated_data):
        file = validated_data.pop('file')
        pdf = PDF.objects.create(file=file, **validated_data)
        pdf.url = pdf.file.url
        pdf.save()
        return pdf