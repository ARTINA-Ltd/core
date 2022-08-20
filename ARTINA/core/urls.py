from django.urls import path,include

from rest_framework import routers
from core.views import OrderViewSet


router = routers.DefaultRouter()
router.register(r'orders',OrderViewSet)


urlpatterns = [
    path('core/', include(router.urls))
]