from cryptography.fernet import Fernet
from django.conf import settings

cipher_suite = Fernet(settings.ENCRYPTION_KEY)

def encrypt_private_key(private_key):
    return cipher_suite.encrypt(private_key.encode()).decode()

def decrypt_private_key(encrypted_private_key):
    return cipher_suite.decrypt(encrypted_private_key.encode()).decode()
