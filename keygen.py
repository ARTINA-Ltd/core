from cryptography.fernet import Fernet

# Generate a new Fernet key
encryption_key = Fernet.generate_key()

# Print the key to save it securely
print(encryption_key.decode())
