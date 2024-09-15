from cryptography.fernet import Fernet
# from django.conf import settings

ENCRYPTION_KEY='B-P9ZtQ-mGyKm-IMFxiM6nJYAH82O8PAwvh7A0reGTc='
cipher_suite = Fernet(ENCRYPTION_KEY)

def encrypt_private_key(private_key):
    return cipher_suite.encrypt(private_key.encode()).decode()

def decrypt_private_key(encrypted_private_key):
    return cipher_suite.decrypt(encrypted_private_key.encode()).decode()
