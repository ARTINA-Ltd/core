from core import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'orders', views.OrderViewSet,basename='orders')
router.register(r'NFTViewSet', views.NFTViewSet,basename='NFTViewSet')
# router.register(r'LocalWalletViewSet', views.LocalWalletViewSet,basename='LocalWalletViewSet')
router.register(r'images', views.MyImageViewSet)
router.register(r'pdfs', views.PDFViewSet)
router.register(r'nft_ratings', views.NFTRatingViewSet,basename='nft_ratings')
router.register(r'categories', views.CategoryViewSet,basename='categories')
router.register(r'collections', views.CollectionViewSet,basename='collections')
router.register(r'wallet-validation', views.WalletValidationViewSet, basename='wallet-validation')
router.register(r'UserCollection', views.UserCollectionViewSet,basename="UserCollection")
# router.register(r'Winner', views.WinnerviewSet,basename="Winner")
# router.register(r'sell', views.sellViewSet,basename="sell")
router.register(r'nft-detail', views.NftDetailViewSet, basename='nft-detail')
router.register(r'nfts', views.NftViewSet,basename='nfts')
router.register(r'nakamigos-listings', views.NakamigosListingsViewSet, basename='nakamigos_listings')
router.register(r'UsersWithNFTsViewSet', views.UsersWithNFTsViewSet, basename='UsersWithNFTsViewSet')
# router.register(r'listingViewSet', views.listingViewSet, basename='listingViewSet')
router.register(r'collection/(?P<username>[^/.]+)/nfts', views.UserNFTViewSet, basename='user_nfts')
router.register(r'transfers', views.TransferViewSet, basename='transfer')




urlpatterns = [
    path('', include(router.urls))
]
