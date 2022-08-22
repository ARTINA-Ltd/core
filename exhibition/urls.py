from rest_framework import routers
from django.urls import path, include
from exhibition import views

router = routers.DefaultRouter()
router.register(r'exhibition', views.ExhibitionViewSet)
router.register(r'nftex', views.NFtExView)

urlpatterns= [
    path('',include(router.urls))
]