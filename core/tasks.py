# tasks.py
from celery import shared_task
from django.utils import timezone
from .models import NFT

@shared_task
def check_nft_end_time(nft_id):
    from .views import get_winner

    try:
        nft = NFT.objects.get(id=nft_id)
        print(f">>>>>>>{nft}")
        now = timezone.now()

        if now >= nft.end_date:
            # Call your winner function with the token_id
            get_winner(nft.token_id)
    except NFT.DoesNotExist:
        print(f"NFT with ID {nft_id} does not exist.")
