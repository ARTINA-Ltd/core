from django.urls import path, include
from Account import views

urlpatterns=[
    path(
        'artists/<id>/exhibitions',
        views.ArtistExhibitionView.as_view({'get' : 'list'}),
        name='Get exhibitions of an artist'
    ),

]