from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from .models import *
from .serializers import *

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def create(self, request, *args, **kwargs):
        user1 = request.user
        game = Game.objects.create(user1=user1)
        GameSession.objects.create(user=user1, game=game, user_turn=True)
        return Response(GameSerializer(game).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def join_game(self, request, pk=None):
        game = self.get_object()
        user2 = request.user
        if game.user2:
            return Response({"detail": "Game already has two players."}, status=status.HTTP_400_BAD_REQUEST)
        
        game.user2 = user2
        game.save()
        GameSession.objects.create(user=user2, game=game, user_turn=False)
        return Response(GameSerializer(game).data)

    @action(detail=True, methods=['post'])
    def play_turn(self, request, pk=None):
        game = self.get_object()
        user = request.user
        session = game.sessions.filter(user=user, is_active=True).first()

        if not session:
            return Response({"detail": "No active session found or not your turn."}, status=status.HTTP_400_BAD_REQUEST)
        
        choice = request.data.get('choice')
        if choice not in ['rock', 'paper', 'scissors']:
            return Response({"detail": "Invalid choice."}, status=status.HTTP_400_BAD_REQUEST)
        
        session.choice = choice
        session.user_turn = False
        session.is_active = False
        session.save()

        # Update game state
        if game.sessions.count() == 2:  # Both players have made their choice
            user1_session = game.sessions.filter(user=game.user1).first()
            user2_session = game.sessions.filter(user=game.user2).first()

            # Determine the outcome
            result = self.determine_winner(user1_session.choice, user2_session.choice)
            if result == 'draw':
                user1_session.result = user2_session.result = 'draw'
            elif result == 'user1':
                user1_session.result = 'win'
                user2_session.result = 'lose'
            elif result == 'user2':
                user1_session.result = 'lose'
                user2_session.result = 'win'

            user1_session.is_active = user2_session.is_active = False
            game.is_active = False  # Game is over
            user1_session.save()
            user2_session.save()
            game.save()

        else:
            # Update turns
            opponent_session = game.sessions.exclude(user=user).first()
            opponent_session.user_turn = True
            opponent_session.save()

        return Response(GameSessionSerializer(session).data)

    @action(detail=False, methods=['get'])
    def user_game_sessions(self, request):
        user = request.user
        active_sessions = GameSession.objects.filter(
            game__is_active=True,
            is_active=True,
            user=user,
            user_turn=True
        )
        inactive_sessions = GameSession.objects.filter(
            game__is_active=False,
            is_active=False,
            user=user
        )

        combined_sessions = active_sessions | inactive_sessions
        serializer = GameSessionSerializer(combined_sessions, many=True)
        return Response(serializer.data)

    def determine_winner(self, choice1, choice2):
        if choice1 == choice2:
            return 'draw'
        elif (choice1 == 'rock' and choice2 == 'scissors') or \
             (choice1 == 'scissors' and choice2 == 'paper') or \
             (choice1 == 'paper' and choice2 == 'rock'):
            return 'user1'
        else:
            return 'user2'
