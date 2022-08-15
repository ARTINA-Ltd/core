from django.urls import path,include

from rest_framework import routers
from core import views


router = routers.DefaultRouter()
router.register(r'orders',views.OrderViewSet)
router.register(r'nftexs',views.NFtExView)


urlpatterns = [
    path('', include(router.urls))
]