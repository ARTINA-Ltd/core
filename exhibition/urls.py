from rest_framework import routers
from django.urls import path, include
from exhibition import views

from .views import  *

router = routers.DefaultRouter()
router.register(r'exhibitions', views.ExhibitionViewSet,basename="exhibition")
router.register(r'applications', views.ApplicationViewSet,basename="Application")
router.register(r'ExhibitorClosedExhibitions/(?P<exhibitor_id>\d+)', views.ExhibitorClosedExhibitionsViewSet, basename='exhibitor-user-past-exhibitions')
router.register(r'ExhibitorOpenExhibitions/(?P<exhibitor_id>\d+)', views.ExhibitorOpenExhibitionsViewSet, basename='exhibitor-user-online-exhibitions')
router.register(r'artist-user-past-exhibitions', views.ArtistClosedExhibitionsViewSet, basename='artist-user-past-exhibitions')
router.register(r'artist-user-online-exhibitions', views.ArtistOpenExhibitionsViewSet, basename='artist-user-online-exhibitions')
router.register(r'open-for-artist-registration-exhibitions', views.OpenForArtistRegistrationExhibitionsViewSet, basename='open-for-artist-registration-exhibitions')
router.register(r'ExhibitionInfoView', views.ExhibitionInfoView, basename='ExhibitionInfoView')
# router.register(r'ExhibitorApplicationsAcceptance', views.ExhibitorApplicationsViewSet.as_view(), basename='ExhibitorApplicationsAcceptance')
router.register(r'user-exhibitions', views.UserExhibitionsViewSet,basename="user-exhibitions")
router.register(r'exhibition/(?P<exhibition_id>\d+)', views.NFTByExhibitionViewSet, basename='exhibitionnfts')
router.register(r'categories', views.CategoryViewSet,basename='categories')
router.register(r'Ticket', views.TicketViewSet,basename='Ticket')
router.register(r'ExTicketViewSet', views.ExTicketViewSet,basename='ExTicketViewSet')
router.register(r'OpenExhibitionListView', views.OpenExhibitionListView,basename='OpenExhibitionListView')
router.register(r'UserPastExhibitions', views.UserPastExhibitionsViewSet,basename='UserPastExhibitions')
router.register(r'AcceptedExhibitions', views.AcceptedExhibitionsViewSet,basename='AcceptedExhibitions')





urlpatterns = [
    path('', include(router.urls)),
]
