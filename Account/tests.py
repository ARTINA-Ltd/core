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
from .models import Profile , Role
from .serializers import ProfileSerializer

# class ProfileViewSetTestCase(TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.user = User.objects.create_user(username='testuser', password='testpass')
#         self.client.force_authenticate(user=self.user)
#         self.profile = Profile.objects.create(user=self.user, name='Test name', address='Test address')

#     def test_update_profile(self):
#         url = reverse('profile-detail', kwargs={'pk': self.profile.pk})
#         data = {'name': 'Updated name', 'address': 'Updated address'}
#         response = self.client.put(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.profile.refresh_from_db()
#         self.assertEqual(self.profile.name, 'sohrab')
#         self.assertEqual(self.profile.email, 'loveaddress')



from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate
from django.contrib.auth.models import User
from .models import UserBalance,Payment
from .views import UserBalanceViewSet

class UserBalanceViewTests(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.create_user(username='testuser', password='password')
        print(self.user)
        UserBalance.objects.create(
            user=self.user, 
            user_id=self.user.id,
            rial_available_balance=10000,
            rial_untradable_balance=2000,
            eth_balance=5,
            eth_unavailable_balance=1
            # Add other balance fields as needed
        )
        

    def test_get_balance_happy_path(self):
        request = self.factory.get('/api/Account/get_balance/')
        force_authenticate(request, user=self.user)
        view = UserBalanceViewSet.as_view(actions={'get': 'get_balance'})
        response = view(request)
        print(response)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['rial_available_balance'], 10000)
        self.assertEqual(response.data['rial_unavailable_balance'], 2000)
        self.assertEqual(response.data['eth_balance'], 5)
        self.assertEqual(response.data['eth_unavailable_balance'], 1)

    def test_get_balance_not_found(self):
        # Delete the user's balance record
        UserBalance.objects.filter(user=self.user).delete()

        request = self.factory.get('/api/Account/get_balance/')
        force_authenticate(request, user=self.user)
        view = UserBalanceViewSet.as_view(actions={'get': 'get_balance'})
        response = view(request)

        self.assertEqual(response.status_code, 404)
        self.assertIn('User balance not found.', str(response.data))



from unittest.mock import patch
from rest_framework import status
from rest_framework.test import APITestCase, APIClient

class PaymentGateViewSetTest(APITestCase):

    def setUp(self):
        self.client = APIClient()
        # Assuming you have a User model and authentication.
        self.user = User.objects.create_user(username='testuser', password='testpass')
        Profile.objects.create(
            user=self.user,
            user_id=self.user.id,
            first_name="Test",
            last_name="User",
            national_code="1234567890",
            birthdate="01/10/1998",
            phone_number="01234567891",
            cell_number="34567892",
            address="Test Address",
            email="zehippp.sh@gmail.com",
            role=Role.objects.create(name="user_zero")  # Assuming Role model has a 'name' field.
        )        # Add other necessary user profile details
        self.user.profile.save()
        self.client.force_authenticate(user=self.user)

    @patch('Account.views.PaymentGateViewSet.send_payment_request')
    def test_create_payment_request_success(self, mock_send_payment_request):
        # Mock successful response from Zarinpal
        mock_send_payment_request.return_value = MockResponse(
            status_code=200,
            json_data={
                'data': {
                    'authority': 'test_authority'
                }
            }
        )

        response = self.client.post('/api/account/payment/', {"amount": 5000})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('url', response.data)
        self.assertTrue(Payment.objects.filter(authority='test_authority').exists())

class MockResponse:
    def __init__(self, status_code, json_data=None):
        self.status_code = status_code
        self.json_data = json_data

    def json(self):
        return self.json_data
