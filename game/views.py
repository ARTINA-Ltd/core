from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from datetime import datetime, timedelta
from .models import Game, GameSession, UserGameProfile
from .serializers import GameSerializer, GameSessionSerializer, UserGameProfileSerializer
import random

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    # permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['post'])
    def play_solo(self, request, pk=None):
        """
        Endpoint to play solo against the server.
        """
        user=self.request.user
        game = self.get_object()
        # cheat_code = game.cheat_code
        user_choice = request.data.get('choice')
        # user_cheat = request.data.get('cheat_code')
        choices = ['rock', 'paper', 'scissors']
        server_choice = random.choice(choices)
        
        # Example logic to determine game result based on cheat code
        # if cheat_code == user_cheat:
        #     result = 'win'
        #     points_earned = 10
        # else :
            
        if user_choice == server_choice:
                result = 'draw'
        elif (user_choice == 'rock' and server_choice == 'scissors') or \
                 (user_choice == 'paper' and server_choice == 'rock') or \
                 (user_choice == 'scissors' and server_choice == 'paper'):
                result = 'win'
        else:
                result = 'lose'
        
            # Update points for both users based on result
        if result == 'win':
            user_points = 10
        elif result == 'lose':
            user_points = 0
        else:
            user_points = 5
        # Update user's profile with points earned
        user_profile = UserGameProfile.objects.get(user=user)
        user_profile.points += points_earned
        user_profile.save()

        # Save game session details
        session = GameSession.objects.create(
            game=game,
            user=request.user,
            choice=user_choice,
            result=result,
            points=10
        )

        # Update last played timestamp and hearts for user profile
        user_profile.last_played = datetime.now()
        user_profile.hearts -= 1  # Deduct one heart for playing
        user_profile.save()

        return Response({'message': 'Solo game played successfully', 'result': result, 'points_earned': 10,"server_choice":server_choice}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def play_with_friend(self, request, pk=None):
        """
        Endpoint to play with a friend.
        """
        game = self.get_object()
        friend_username = request.data.get('friend_username')
        
        # Logic to find friend and initiate game session
        try:
            friend = User.objects.get(username=friend_username)
        except User.DoesNotExist:
            return Response({'error': 'Friend not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Example game logic for demo purposes
        import random
        choices = ['rock', 'paper', 'scissors']
        user_choice = random.choice(choices)
        friend_choice = random.choice(choices)
        
        if user_choice == friend_choice:
            result = 'draw'
        elif (user_choice == 'rock' and friend_choice == 'scissors') or \
             (user_choice == 'paper' and friend_choice == 'rock') or \
             (user_choice == 'scissors' and friend_choice == 'paper'):
            result = 'win'
        else:
            result = 'lose'
        
        # Update points for both users based on result
        if result == 'win':
            user_points = 50
            friend_points = 0
        elif result == 'lose':
            user_points = 0
            friend_points = 50
        else:
            user_points = 25
            friend_points = 25
        
        # Update user's profile with points earned
        user_profile = UserGameProfile.objects.get(user=request.user)
        user_profile.points += user_points
        user_profile.save()
        
        # Update friend's profile with points earned
        friend_profile = UserGameProfile.objects.get(user=friend)
        friend_profile.points += friend_points
        friend_profile.save()
        
        # Save game session details for both users
        session_user = GameSession.objects.create(
            game=game,
            user=request.user,
            choice=user_choice,
            result=result,
            points=user_points
        )
        
        session_friend = GameSession.objects.create(
            game=game,
            user=friend,
            choice=friend_choice,
            result=result,
            points=friend_points
        )
        
        # Update last played timestamp and hearts for user profile
        user_profile.last_played = datetime.now()
        user_profile.hearts -= 1  # Deduct one heart for playing
        user_profile.save()
        
        return Response({'message': 'Game with friend initiated successfully', 'result': result, 'user_points': user_points, 'friend_points': friend_points}, status=status.HTTP_200_OK)

class GameSessionViewSet(viewsets.ModelViewSet):
    queryset = GameSession.objects.all()
    serializer_class = GameSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Normally, CRUD operations are sufficient for GameSessionViewSet
    # No custom actions needed here for the provided requirements

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserGameProfile.objects.all()
    serializer_class = UserGameProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['post'])
    def buy_hearts(self, request, pk=None):
        """
        Endpoint to buy hearts for a user.
        """
        user_profile = self.get_object()
        hearts_to_buy = request.data.get('hearts_to_buy')
        
        # Logic to handle buying hearts based on request data
        if hearts_to_buy == 20:
            cost = 100000
        elif hearts_to_buy == 1:
            cost = 5000
        elif hearts_to_buy == 10:
            cost = 60000
        else:
            return Response({'error': 'Invalid number of hearts to buy'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Deduct coins from user's profile - Assuming user has coins to spend
        # user_profile.coins -= cost
        user_profile.hearts += hearts_to_buy
        user_profile.save()

        return Response({'message': f'{hearts_to_buy} hearts purchased successfully'}, status=status.HTTP_200_OK)

class LeaderboardViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        """
        Endpoint to fetch leaderboard.
        """
        # Fetch top users based on points
        top_users = UserGameProfile.objects.order_by('-points')[:10]
        serializer = UserGameProfileSerializer(top_users, many=True)
        return Response(serializer.data)
