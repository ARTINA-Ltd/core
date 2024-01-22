# from __future__ import absolute_import, unicode_literals
# import os
# from celery import Celery

# # Set the default Django settings module for the 'celery' program.
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ARTINA.settings')

# app = Celery('ARTINA')

# # Using a string here means the worker doesn't have to serialize the
# # configuration object to child processes.
# app.config_from_object('django.conf:settings', namespace='CELERY')

# # Load task modules from all registered Django app configs.
# app.autodiscover_tasks()
# # Example using RabbitMQ
# BROKER_URL = 'pyamqp://guest:guest@localhost//'
# CELERY_BROKER_CONNECTION_RETRY_ON_STARTUP = True




from celery import Celery
from celery.schedules import crontab

app = Celery('ARTINA')

# Configuration
app.conf.beat_schedule = {
    'check-nft-end-times': {
        'task': 'core.tasks.check_nft_end_times',
        'schedule': crontab(minute='*/5'),  # Adjust the schedule as needed
    },
}

app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()
