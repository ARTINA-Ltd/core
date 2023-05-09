from core import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'orders', views.OrderViewSet,basename='orders')
router.register(r'Nfts', views.NFTViewSet,basename='Nfts')
router.register(r'rate', views.NFTRateViewSet,basename='rate')
router.register(r'NFTViewSet', views.NFTViewSet,basename='NFTViewSet')
router.register(r'images', views.MyImageViewSet)
# router.register(r'Base64ImageParser', views.Base64ImageParser,basename='Base64ImageParser')
router.register(r'UserCollection', views.UserCollectionViewSet,basename="UserCollection")
router.register(r'Winner', views.WinnerviewSet,basename="Winner")
router.register(r'sell', views.sellViewSet,basename="sell")



urlpatterns = [
    path('', include(router.urls))
]
