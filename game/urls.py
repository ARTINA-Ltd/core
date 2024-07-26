from django.urls import path, include
from rest_framework import routers
from .views import GameViewSet, GameSessionViewSet, UserProfileViewSet, LeaderboardViewSet

# Create a router and register our viewsets with it.
router = routers.DefaultRouter()
router.register(r'games', GameViewSet, basename='game')
router.register(r'game-sessions', GameSessionViewSet, basename='game-session')
router.register(r'user-profiles', UserProfileViewSet, basename='user-profile')
router.register(r'leaderboard', LeaderboardViewSet, basename='leaderboard')

urlpatterns = [
    path('', include(router.urls)),
]

