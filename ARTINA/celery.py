# celery.py
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ARTINA.settings')

# create a Celery instance and configure it using the settings from Django
app = Celery('ARTINA')

# Load task modules from all registered Django app configs.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto-discover tasks in all installed apps
app.autodiscover_tasks()

# Add periodic task to run every minute
app.conf.beat_schedule = {
    'nft_end_time': {
        'task': 'core.tasks.check_nft_end_time',
        'schedule': crontab(minute='*/2'),
    },
        'send-sms': {
        'task': 'core.tasks.check_nfts_and_send_sms',  # Task running every 10 minutes
        'schedule': crontab(minute='*/10'),
    },
}