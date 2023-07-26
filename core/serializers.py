from rest_framework import serializers
from core import models


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ['nft', 'bidder', 'fee', 'status', 'date']
        read_only_fields = ['date']


class NFTSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.NFT
        fields = ['id','token_id','name', 'is_for_sale','owner', 'creator', 'last_price', 'image_url' ,'description','external_link','author_address','is_visible','has_physical','share_count','view_count']


class NFTRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.NFTRating
        fields = ['user', 'nft', 'like', 'review']



class MyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MyImage
        fields = ('id', 'image')



from .models import PDF

from rest_framework import serializers
from .models import PDF

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