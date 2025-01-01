from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from ..models import Command
from .serializers import CommandSerializer
from rest_framework.permissions import IsAuthenticated

class CommandViewSet(viewsets.ModelViewSet):
    queryset = Command.objects.all()
    serializer_class = CommandSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """Automatically associate the logged-in client with the command"""
        serializer.save(FK_client=self.request.user.client)

    def get_queryset(self):
        """Filter commands based on the logged-in client"""
        user = self.request.user
        if user.is_authenticated:
            return Command.objects.filter(FK_client=user.client)
        return Command.objects.none()

    @action(detail=True, methods=['post'])
    def mark_as_completed(self, request, pk=None):
        """Custom action to mark a delivery command as completed"""
        command = self.get_object()
        command.status = 'completed'
        command.save()
        return Response({'status': 'Delivery marked as completed'})
