from django.urls import path, include
from rest_framework import routers
from .views import GeneratedImageViewSet

router = routers.DefaultRouter()
router.register(r'generated_images', GeneratedImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]