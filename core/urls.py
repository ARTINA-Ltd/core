from django.urls import path, include
from core import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'orders',views.OrderViewSet)
router.register(r'Nfts',views.NFTViewSet)

urlpatterns = [
    path('', include(router.urls))
]