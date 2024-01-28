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

@shared_task

def check_nft_end_time():
    print("Task started")
    from .views import get_winner

    now = timezone.now()
    nfts_to_process = NFT.objects.filter(end_date__lte=now, is_for_sale=True)

    for nft in nfts_to_process:
        print(f"Processing NFT {nft.token_id}")
        line=get_winner(nft.token_id)  # Use delay to enqueue the task asynchronously
        print(line)
        nft.is_for_sale = False 
        print(f"Finished processing NFT {nft.token_id}") 
        print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.>>>>>>>>>>line")
        nft.save()
    print("Task completed")
