"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

from django.test import TestCase


class SimpleTest(TestCase):
    def test_basic_addition(self):
        """
        Tests that 1 + 1 always equals 2.
        """
        self.assertEqual(1 + 1, 2)



from django.test import TestCase, Client
from rest_framework import status
from rest_framework.test import APIClient
from django.urls import reverse
from .models import Profile
from .serializers import ProfileSerializer

class ProfileViewSetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.force_authenticate(user=self.user)
        self.profile = Profile.objects.create(user=self.user, name='Test name', address='Test address')

    def test_update_profile(self):
        url = reverse('profile-detail', kwargs={'pk': self.profile.pk})
        data = {'name': 'Updated name', 'address': 'Updated address'}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.profile.refresh_from_db()
        self.assertEqual(self.profile.name, 'sohrab')
        self.assertEqual(self.profile.email, 'loveaddress')
