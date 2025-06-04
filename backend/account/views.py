from .serializers import AccountSerializer
from rest_framework import generics
from .models import Account, Login

class AccountListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create accounts.
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
class AccountDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete an account.
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
class LoginView(generics.CreateAPIView):
    """ API view to handle user login."""
    queryset = Login.objects.all()
    serializer_class = AccountSerializer  # Assuming you have a serializer for Login model

    def perform_create(self, serializer):
        """
        Override to handle login logic.
        """
        # Implement your login logic here
        # For example, authenticate the user and return a token
        pass
