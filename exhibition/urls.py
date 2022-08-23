from rest_framework import routers
from django.urls import path, include
from exhibition import views

router = routers.DefaultRouter()
router.register(r'exhibitions', views.ExhibitionViewSet, basename='exhibitions')
router.register(r'nftexs', views.NFtExView, basename='nftexs')

urlpatterns = [
    path('', include(router.urls))
]