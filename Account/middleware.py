from datetime import datetime

class FailedLoginMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.failed_logins = {}  # Store failed logins here in the format {username: count}

    def __call__(self, request):
        response = self.get_response(request)
        
        if request.path == 'https://api.artina.org/api/account/login/' and request.method == "POST" and response.status_code == 200:  # Check if it's a POST request to the login view and it returned a 200 (which indicates a failed login in Django's built-in view).
            print("looooooooool")
            username = request.POST.get('username')
            self.failed_logins[username] = self.failed_logins.get(username, 0) + 1
            print("loeeeoooooooool")

            # Log the details
            with open("failed_logins.log", "a") as f:
                f.write(f"{datetime.now()}: Failed login attempt for user: {username}. Total attempts: {self.failed_logins[username]}\n")

        return response


# import logging

# logger = logging.getLogger('Account.PaymentGateViewSet')

# class PaymentLoggingMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         # Before processing the view
#         print("kli")
#         if '/api/account/payment/' in request.path:
#             logger.debug(f"Payment request initiated by {request.user}")
#         print("kooli")
#         response = self.get_response(request)

#         # # After processing the view
#         # if '/api/account/payment/' in request.path:
#         #     logger.debug(f"Payment response for {request.user} with status code: {response.status_code}")

#         return response
