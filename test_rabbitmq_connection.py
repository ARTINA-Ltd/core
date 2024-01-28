import pika

# RabbitMQ connection parameters
connection_params = pika.ConnectionParameters(
    host='your_rabbitmq_server_ip',
    port=5672,
    virtual_host='/',
    credentials=pika.PlainCredentials(username='your_username', password='your_password')
)

# Establish connection
connection = pika.BlockingConnection(connection_params)
print("Successfully connected to RabbitMQ.")

# Close the connection
connection.close()
