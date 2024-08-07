from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from datetime import datetime, timedelta
from .models import Game, GameSession, UserGameProfile, CheatCode
from .serializers import GameSerializer, GameSessionSerializer, UserGameProfileSerializer
import random


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'])
    def create_play_solo(self, request):
        user = request.user
        profile = UserGameProfile.objects.get(user=user)
        if profile.hearts >= 1:
            game = Game.objects.create(user1=user)
            GameSession.objects.create(game=game, user=user, points=10, user_turn=True)
            return Response({"id": game.id}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "You don't have credit to play"}, status=status.HTTP_403_FORBIDDEN)

    @action(detail=False, methods=['post'])
    def create_play_friend(self, request):
        user = request.user
        profile = UserGameProfile.objects.get(user=user)
        friend_username = request.data.get('friend_username')
        try:
            user2 = User.objects.get(username=friend_username)
        except User.DoesNotExist:
            return Response({"message": "Friend not found"}, status=status.HTTP_404_NOT_FOUND)

        if profile.hearts >= 1:
            game = Game.objects.create(user1=user, user2=user2)
            GameSession.objects.create(game=game, user=user, points=50, user_turn=True)
            GameSession.objects.create(game=game, user=user2, points=50, user_turn=False)
            return Response({"id": game.id}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "You don't have credit to play"}, status=status.HTTP_403_FORBIDDEN)

    @action(detail=True, methods=['post'])
    def play_solo(self, request, pk=None):
        user = request.user
        game = self.get_object()
        user_choice = request.data.get('choice')
        user_cheat = request.data.get('cheat_code')
        choices = ['rock', 'paper', 'scissors']
        server_choice = random.choice(choices)
        user_profile = UserGameProfile.objects.get(user=user)

        if CheatCode.objects.filter(cheat_code=user_cheat).exists():
            result = "win"
        elif user_choice == server_choice:
            result = 'draw'
        elif (user_choice == 'rock' and server_choice == 'scissors') or \
             (user_choice == 'paper' and server_choice == 'rock') or \
             (user_choice == 'scissors' and server_choice == 'paper'):
            result = 'win'
        else:
            result = 'lose'

        if result == 'win':
            user_points = 10
            user_profile.points += 10
        elif result == 'lose':
            user_points = 0
            user_profile.hearts -= 1
        else:
            user_points = 5
            user_profile.points += 5

        user_profile.save()
        session = GameSession.objects.get(game=game, user=user)
        session.choice = user_choice
        session.result = result
        session.user_turn = False
        session.save()
        game.is_active = False
        game.save()
        user_profile.last_played = datetime.now()
        user_profile.save()

        return Response({'message': 'Solo game played successfully', 'result': result, 'points_earned': user_points, "server_choice": server_choice}, status=status.HTTP_200_OK)

    @staticmethod
    def is_game_finished(game):
        if (datetime.now() - game.created_at).total_seconds() > 86400:  # 24 hours
            game.is_active = False
            game.save()
            return True
        return False

    @staticmethod
    def determine_winner(game):
        sessions = GameSession.objects.filter(game=game)
        gamer1 = sessions.first()
        gamer2 = sessions.last()

        if not gamer1.choice or not gamer2.choice:
            return

        if gamer1.choice == gamer2.choice:
            gamer1.result = 'draw'
            gamer2.result = 'draw'
            gamer1.points += 25
            gamer2.points += 25
        elif (gamer1.choice == 'rock' and gamer2.choice == 'scissors') or \
             (gamer1.choice == 'paper' and gamer2.choice == 'rock') or \
             (gamer1.choice == 'scissors' and gamer2.choice == 'paper'):
            gamer1.result = 'win'
            gamer2.result = 'lose'
            gamer1.points += 50
            gamer2.hearts -= 1
        else:
            gamer1.result = 'lose'
            gamer2.result = 'win'
            gamer1.hearts -= 1
            gamer2.points += 50

        game.is_active = False
        game.save()
        gamer1.save()
        gamer2.save()

    @action(detail=True, methods=['post'])
    def play_friend(self, request, pk=None):
        user = request.user
        game = self.get_object()
        user_choice = request.data.get('choice')
        user_cheat = request.data.get('cheat_code')
        session = GameSession.objects.get(game=game, user=user)
        opponent_session = GameSession.objects.filter(game=game).exclude(user=user).first()

        if self.is_game_finished(game):
            return Response({'error': 'Your 24 hours time for play is finished'}, status=status.HTTP_400_BAD_REQUEST)

        if session.user_turn == False:
            return Response({'error': 'Not your turn to choose'}, status=status.HTTP_400_BAD_REQUEST)

        if CheatCode.objects.filter(cheat_code=user_cheat).exists():
            session.choice = user_choice
            session.result = "win"
            session.points += 50
            session.user_turn = False
            session.save()
            user_profile = UserGameProfile.objects.get(user=user)
            user_profile.points += 50
            user_profile.last_played = datetime.now()
            user_profile.save()
            self.determine_winner(game)
            return Response({'message': 'You won using a cheat code'}, status=status.HTTP_200_OK)

        session.choice = user_choice
        session.user_turn = False
        session.save()
        user_profile = UserGameProfile.objects.get(user=user)
        user_profile.last_played = datetime.now()
        user_profile.save()

        if not opponent_session.user_turn:
            self.determine_winner(game)
            return Response({'message': 'Game result is on'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Wait for your opponent'}, status=status.HTTP_200_OK)
            
        
 
        


        
        
        
        

class GameSessionViewSet(viewsets.ModelViewSet):
    queryset = GameSession.objects.all()
    serializer_class = GameSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def user_game_list(self,request):
        user=self.request.user
        return GameSession.objects.filter(user=user)


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
