# from django.utils import timezone
# from .models import NFT
# # tasks.py
# from celery import shared_task
# from django.utils import timezone
# from .models import NFT
# from .views import get_winner

# @shared_task
# def check_nft_end_time(nft_id):
#     from .views import get_winner

#     try:
#         nft = NFT.objects.get(id=nft_id)
#         print(f">>>>>>>{nft}")
#         now = timezone.now()

#         if now >= nft.end_date:
#             # Call your winner function with the token_id
#             get_winner(nft.token_id)
#     except NFT.DoesNotExist:
#         print(f"NFT with ID {nft_id} does not exist.")



# @periodic_task(run_every=timezone.timedelta(minutes=5))  # Adjust the interval as needed
# def check_nft_end_times():
#     now = timezone.now()
#     nfts_to_process = NFT.objects.filter(end_date__lte=now, is_for_sale =True)

#     for nft in nfts_to_process:
#         get_winner.delay(nft.token_id)  # Use delay to enqueue the task asynchronously
#         nft.is_for_sale = Fal
# tasks.py
from __future__ import absolute_import, unicode_literals

from datetime import timedelta
from celery import shared_task
#from django.utils import timezone
from .models import NFT
from .views import get_winner
#import time
from celery import shared_task
from datetime import datetime
import pytz

# Define the Tehran timezone using pytz.
tehran_tz = pytz.timezone('Asia/Tehran')

@shared_task
def check_nft_end_time():
    # Get the current time in the Tehran timezone.
    now_in_tehran = datetime.now(tehran_tz)
    
    # You can use now_in_tehran in your logic to check for NFT end time.
    print(f"Current time in Tehran: {now_in_tehran}")

    print("Task started")

    #now = timezone.now()
    nfts_to_process = NFT.objects.filter(end_date__lte=now, is_for_sale=True)

    for nft in nfts_to_process:
        print(f"Processing NFT {nft.token_id}")
        tokenid=nft.token_id
        line=get_winner(tokenid)  # Use delay to enqueue the task asynchronously
        print("start waiting")
        time.sleep(130)
        print("waiting is done")
        print(f"this is the result>>>>>>>>>>>>>>>>>>>>>>>{line}")
        print(f"Finished processing NFT {nft.token_id}") 
        print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.>>>>>>>>>>line")
    print("Task completed")
