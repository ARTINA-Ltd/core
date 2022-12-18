from django.urls import path, include
from Account import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'artists', views.ArtistViewSet)
router.register(r'rate', views.ArtistRateViewSet)
router.register(r'profile', views.ProfileViewSet)

urlpatterns = [
    path('', include(router.urls))
]
