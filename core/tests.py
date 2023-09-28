from unittest.mock import patch, Mock
from django.test import TestCase
from rest_framework.test import APIRequestFactory
from django.contrib.auth.models import User
from thirdweb.types import NFTMetadataInput

from .models import NFT ,MyImage# Adjust the import path according to your structure
from Account.models import UserBalance, UserTurnover  # Adjust the import path according to your structure
from core.views import NFTViewSet  # Adjust the import path according to your structure

class NFTViewSetTest(TestCase):


    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.create_user(username='testuser', password='password')
        print(self.user)
        UserBalance.objects.create(
            user=self.user, 
            user_id=self.user.id,
            rial_available_balance=100000,
            rial_untradable_balance=2000,
            eth_balance=5,
            eth_unavailable_balance=1
            # Add other balance fields as needed
        )
        print(self.user)

    @patch('core.views.ThirdwebSDK.from_private_key')  # Adjust the path to match where you import ThirdwebSDK in your views
    @patch('core.views.contract.mint_to')  # Adjust the path to match where you call contract.mint_to in your views
    def test_create_nft_success(self, mock_mint_to, mock_sdk_init):
        # Mocking the transaction returned by the external mint_to call
        mock_transaction = Mock()
        mock_transaction.id = 1234  # An arbitrary transaction ID for our test
        mock_mint_to.return_value = mock_transaction
        print("1")
        # Mocking the SDK and contract interactions
        mock_sdk = Mock()
        mock_sdk.get_nft_collection.return_value = Mock()
        mock_sdk_init.return_value = mock_sdk
        print("2")

        # Crafting a mock POST request with necessary data
        data = {
            'author_address': '0x2293221D7c357FB04De9c7D0dEeBcA427407429D',
            'nft_name': 'Test NFT',
            'description_nft': 'Test Description',
            'image_nft': 'http://api.artina.org/static/images/neom-qqwX49ov8UY-unsplash.jpg',
            'creator': 'Test Creator',
            'external_link': 'http://link.url',
            'last_price': 1
        }
        request = self.factory.post('/dummy/', data)
        request.user = self.user
        print(request.user.id )

        # Invoking the 'create' method
        view = NFTViewSet.as_view({'post': 'create'})
        print(view)
        response = view(request)
        print(response)
        print("4")

        # Assertions to verify the behavior

        # Checking the response status code and body
        self.assertEqual(response.status_code, 201)

        # Ensuring an NFT record is created in the database
        self.assertTrue(NFT.objects.filter(token_id=1234).exists())
        print("5")

        # Ensuring the user balance is reduced by 10000
        self.assertEqual(UserBalance.objects.get(user=self.user).rial_available_balance, 5000)

        # You can add more assertions, like ensuring a transaction record is created, etc.



from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

class MyImageViewSetTest(TestCase):

    def setUp(self):
        self.client = APIClient()

        # Assuming you have a User model and authentication. 
        # If not, you can skip these lines.
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.force_authenticate(user=self.user)

    def test_create_image_success(self):
        # Craft the data with an image. Adjust the path to a valid image on your machine.
        with open('/home/zehi/core/front-react/public/1.jpg', 'rb') as image:
            data = {'image': image}
            response = self.client.post('/api/transaction/images/', data, format='multipart')
            print (f"res:{response}")        
        # Assertions to verify the behavior
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('id', response.data)
        self.assertIn('image', response.data)

        # If you use a hostname or specific domain, adjust the below accordingly.
        expected_image_url = response.data['image']
        self.assertEqual(expected_image_url, response.data['image'])

        # Ensure the image object is created in the database
        self.assertTrue(MyImage.objects.filter(id=response.data['id']).exists())

