from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from datetime import datetime, timedelta
from .models import *
from .serializers import GameSerializer, GameSessionSerializer, UserGameProfileSerializer
import random

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    # permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'])
    def create_play_solo(self,request):
        user=self.request.user
        profile=UserGameProfile.objects.get(user=user)
        if profile.hearts>= 1 :
            game= Game.objects.create(user1=user)
            GameSession.objects.create(user=user,points=10,user_turn=True)
            return Response ({"id":game.id},status=status.HTTP_201_CREATED)
        else :
            return Response ({"message":"you don't have credit to play"},status=status.HTTP_403_BAD_REQUEST)
    
    
    @action(detail=False, methods=['post'])
    def creat_play_friend(self,request):
        user=self.request.user
        profile=UserGameProfile.objects.get(user=user)
        friend_username = request.data.get('friend_username')
        user2= User.objects.get(username=friend_username)
        if profile.hearts>= 1 :
            game= Game.objects.create(user1=user,user2=user2)
            GameSession.objects.create(user=user,points=50,user_turn=True)
            GameSession.objects.create(user=user2,points=50,user_turn=True)
            return Response ({"id":game.id},status=status.HTTP_201_CREATED)
        else :
            return Response({"message":"you don't have credit to play"},status=status.HTTP_403_BAD_REQUEST)
        
    @action(detail=True, methods=['post'])
    def play_solo(self, request, pk=None):
        """
        Endpoint to play solo against the server.
        """
        user=self.request.user
        game = self.get_object()
        
        user_choice = request.data.get('choice')
        user_cheat = request.data.get('cheat_code')
        choices = ['rock', 'paper', 'scissors']
        server_choice = random.choice(choices)
        user_profile = UserGameProfile.objects.get(user=user)
        if CheatCode.objects.get(cheat_code=user_cheat) :
            result="win"    
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
            user_profile.save()
        elif result == 'lose':
            user_points = 0
            user_profile.hearts -= 1
            user_profile.save()
        else:
            user_points = 5
            user_profile.points += 5
            user_profile.save()
        session=GameSession.objects.get(game=game,user=user)
        session.choice=user_choice
        session.result=result
        session.user_turn=False
        session.save()
        game.is_active=False
        game.save()
        # Update last played timestamp and hearts for user profile
        user_profile.points=user_points
        user_profile.last_played = datetime.now()
        user_profile.save()


        return Response({'message': 'Solo game played successfully', 'result': result, 'points_earned': 10,"server_choice":server_choice}, status=status.HTTP_200_OK)

    
    def is_game_finished(gameid):
        game=Game.objects.get(id=gameid)
        gamesession=GameSession.objects.filter(game=game)
        #if time passed 24 hours from created game is finished

        today=datetime.now().date()
        if game.created_at>today:
            game.is_active=False 
            game.save()   
            return Response({'error': 'Your 24 hours time for play is finished'}, status=status.HTTP_400_BAD_REQUEST)
        else:   
            for game in gamesession :
                if game.user_turn==True:
                    return Response({'message': 'Game is still on','is_game_finished':"False"}, status=status.HTTP_200_OK)
        game.is_active=False    
        game.save()   

        return Response({'message': 'Game is finished','is_game_finished':"True"}, status=status.HTTP_200_OK)
        



    def who_won(gameid):
        game=Game.objects.get(id=gameid)
        gamesession=GameSession.objects.filter(game=game)
        gamer1=gamesession.first()
        gamer2=gamesession.last()
        profile1=UserGameProfile.objects.get(user=gamer1.user)
        profile2=UserGameProfile.objects.get(user=gamer2.user)
        today=datetime.now().date()
        if game.created_at>today:
            if gamer1.user_turn==True :
                gamer1.result='lose'
                gamer2.result='win'
                profile1.hearts-=1
                profile2.points+=50
            else:
                gamer2.result='lose'
                gamer1.result='win'
                profile1.points+=50
                profile2.hearts-=1                
        
        # points=game.points
        elif gamer1.choice == gamer2.choice:
            gamer1.result = 'draw'
            gamer2.result = 'draw'
            profile1.points+=25
            profile2.points+=25

        elif (gamer1.choice == 'rock' and gamer2.choice == 'scissors') or \
             (gamer1.choice == 'paper' and gamer2.choice == 'rock') or \
             (gamer1.choice == 'scissors' and gamer2.choice == 'paper'):
            gamer1.result = 'win'
            gamer2.result = 'lose'
            profile1.points+=50
            profile2.hearts-=1
    

        else:
            gamer1.result  = 'lose'
            gamer2.result = 'win'
            profile1.hearts-=1
            profile2.points+=50

        game.is_active=False
        game.save()
        profile1.save()
        profile2.save()
        gamer1.save()
        gamer2.save()

               



    @action(detail=True, methods=['post'])
    
    
    def play_friend_user1(self, request, pk=None):

        user=self.request.user
        game = self.get_object()
        user_choice = request.data.get('choice')
        user_cheat = request.data.get('cheat_code')
        choices = ['rock', 'paper', 'scissors'] 
        session=GameSession.objects.get(game=game,user=user)
        opponent_session=GameSession.objects.filter(game=game,user!=user).first()
        self.is_game_finished(game.id)
        if game.is_active==False:
            return Response({'error': 'Your 24 hours time for play is finished'}, status=status.HTTP_400_BAD_REQUEST)

        if CheatCode.objects.get(cheat_code=user_cheat) :
            result="win"
            session.choice=user_choice,
            session.result=result,
            session.points=user_points,
            session.user_turn=False,
            session.save()

        # Update last played timestamp and hearts for user profile
            user_profile = UserGameProfile.objects.get(user=user)
            user_profile.last_played = datetime.now()
            user_profile.save() 
        


        if session.user_turn == False :
            return Response({'error': 'Not your turn to choose'}, status=status.HTTP_400_BAD_REQUEST)
        
        session.choice=user_choice,
        session.user_turn=False,
        session.save()

        # Update last played timestamp and hearts for user profile
        user_profile = UserGameProfile.objects.get(user=user)
        user_profile.last_played = datetime.now()
        user_profile.save()  
        if opponent_session.user_turn==False:
            self.who_won(game.id)
            return Response({'message': 'game rsult is on'}, status=status.HTTP_200_OK)

        else:
            return Response({'message': 'wait for your opponent'}, status=status.HTTP_200_OK)


        
        
        
        

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
