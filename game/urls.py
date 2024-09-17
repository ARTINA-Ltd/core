from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'games', GameViewSet)
# router.register(r'games', GameViewSet, basename='game')
# #router.register(r'game-sessions', GameSessionViewSet, basename='game-session')
router.register(r'user-profiles', UserProfileViewSet, basename='user-profile')
router.register(r'leaderboard', LeaderboardViewSet, basename='leaderboard')

urlpatterns = [
    path('', include(router.urls)),
]

