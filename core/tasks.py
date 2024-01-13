# tasks.py
from celery import shared_task
from django.utils import timezone
from .models import NFT
from.views import get_winnger

@shared_task
def check_nft_end_time(nft_id):
    try:
        nft = NFT.objects.get(id=nft_id)
        now = timezone.now()

        if now >= nft.end_time:
            # Call your winner function with the token_id
            get_winnger(nft.token_id)
    except NFT.DoesNotExist:
        print(f"NFT with ID {nft_id} does not exist.")
