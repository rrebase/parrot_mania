from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from parrots.models import Parrot
from parrots.serializers import ParrotSerializer


class ParrotViewSet(viewsets.ModelViewSet):
    queryset = Parrot.objects.all()
    serializer_class = ParrotSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    def get_queryset(self):
        """Return the authenticated user's parrots."""
        return super().get_queryset().filter(user=self.request.user)
