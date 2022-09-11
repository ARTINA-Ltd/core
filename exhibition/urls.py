from rest_framework import routers
from django.urls import path, include
from exhibition import views

router = routers.DefaultRouter()
router.register(r'exhibitions', views.ExhibitionViewSet, basename='exhibitions')
router.register(r'nftexs', views.NFtExView, basename='nftexs')
router.register(r'transactions', views.TransactionList, basename='transactions')
router.register(r'exhibitors', views.ExhibitorViewSet, basename='exhibitors')

urlpatterns = [
    path('', include(router.urls))
]
