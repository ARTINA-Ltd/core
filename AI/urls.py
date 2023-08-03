from django.urls import path, include
from rest_framework import routers
from .views import GeneratedImageViewSet,WaitListViewSet

router = routers.DefaultRouter()
router.register(r'generated_images', GeneratedImageViewSet)
router.register(r'WaitListViewSet', WaitListViewSet,basename='WaitList')



urlpatterns = [
    path('', include(router.urls)),
]