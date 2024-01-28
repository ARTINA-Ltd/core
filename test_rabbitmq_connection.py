import pika

# RabbitMQ connection parameters
connection_params = pika.ConnectionParameters(
    host='127.0.0.1',
    port=5672,
    virtual_host='/',
    credentials=pika.PlainCredentials(username='administrator', password='123qweasdZXC')
)

# Establish connection
connection = pika.BlockingConnection(connection_params)
print("Successfully connected to RabbitMQ.")

# Close the connection
connection.close()
