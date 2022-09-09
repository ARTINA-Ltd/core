from django.urls import path, include
from core import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'orders',views.OrderViewSet)

urlpatterns = [
    path('', include(router.urls))
]