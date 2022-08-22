from rest_framework import routers
from django.urls import path, include
from exhibition import views

router = routers.DefaultRouter()
router.register(r'', views.ExhibitionViewSet, basename='exhibition')
router.register(r'', views.NFtExView, basename='nftex')

urlpatterns= [
    path('',include(router.urls))
]