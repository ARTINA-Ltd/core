from rest_framework import routers
from django.urls import path, include
from exhibition import views

from .views import  *

router = routers.DefaultRouter()
router.register(r'exhibitions', views.ExhibitionViewSet,basename="exhibition")
router.register(r'applications', views.ApplicationViewSet,basename="Application")
router.register(r'ExhibitorClosedExhibitions/(?P<exhibitor_id>\d+)', views.ExhibitorClosedExhibitionsViewSet, basename='exhibitor-user-past-exhibitions')
router.register(r'artist-user-past-exhibitions', views.ArtistClosedExhibitionsViewSet, basename='artist-user-past-exhibitions')
router.register(r'open-for-artist-registration-exhibitions', views.OpenForArtistRegistrationExhibitionsViewSet, basename='open-for-artist-registration-exhibitions')
# router.register(r'applications/(?P<pk>\d+)', views.ApplicationViewSet., basename='application-detail')
# router.register(r'applications/exhibitor/', views.ApplicationViewSet.as_view(), basename='exhibitor-applications'),
router.register(r'OpenExhibitionList', views.OpenExhibitionListView, basename='OpenExhibitionList'),
router.register(r'ExhibitionInfoView', views.ExhibitionInfoView, basename='ExhibitionInfoView')
# router.register(r'ExhibitorApplicationsAcceptance', views.ExhibitorApplicationsViewSet.as_view(), basename='ExhibitorApplicationsAcceptance')
router.register(r'user-exhibitions', views.UserExhibitionsViewSet,basename="user-exhibitions")
# router.register(r'exhibition/(?P<exhibition_id>\d+)', NFTByExhibitionViewSet, basename='exhibitionnfts')
urlpatterns = [
    path('', include(router.urls)),
]
