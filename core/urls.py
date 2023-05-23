from core import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'orders', views.OrderViewSet,basename='orders')
router.register(r'rate', views.NFTRateViewSet,basename='rate')
router.register(r'NFTViewSet', views.NFTViewSet,basename='NFTViewSet')
router.register(r'images', views.MyImageViewSet)
# router.register(r'Base64ImageParser', views.Base64ImageParser,basename='Base64ImageParser')
router.register(r'UserCollection', views.UserCollectionViewSet,basename="UserCollection")
router.register(r'Winner', views.WinnerviewSet,basename="Winner")
router.register(r'sell', views.sellViewSet,basename="sell")
# router.register(r'NftDetail', views.NftDetailViewSet,basename="NftDetail")
router.register(r'nft-detail', views.NftDetailViewSet, basename='nft-detail')
router.register(r'nfts', views.NftViewSet,basename='nfts')
router.register(r'nakamigos-listings', views.NakamigosListingsViewSet, basename='nakamigos_listings')
router.register(r'collection/(?P<username>[^/.]+)/nfts', views.UserNFTViewSet, basename='user_nfts')
# path('colection/<str:username>/', views.UserNFTList, name='user_nft_list')

urlpatterns = [
    path('', include(router.urls))
]
