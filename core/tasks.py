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
#         nft.is_for_sale = False  # Assuming you have a field to track if the winner has been processed
#         nft.save()

# tasks.py
from datetime import timedelta
from celery import shared_task
from django.utils import timezone
from .models import NFT
from .views import get_winner
import time
from .views import send_sms

@shared_task

def check_nft_end_time():
    print("Task started")

    now = timezone.now()
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



@shared_task
def check_nfts_and_send_sms():
    now = timezone.now()
    half_hour_later = now + timedelta(minutes=30)

    # Find NFTs that have less than half an hour left to end date
    nfts_ending_soon = NFT.objects.filter(end_date__lte=half_hour_later, end_date__gt=now, in_exhibition=False, is_for_sale=True)

    for nft in nfts_ending_soon:
        # Get the owner's phone number
        phone_number = nft.owner.profile.phone_number
        # Construct the message
        name=nft.owner.username
        nft_name=nft.name
        # Send the SMS using your send_sms function
        send_sms(nft_name=nft_name, name=name,phone_number=phone_number)

    
