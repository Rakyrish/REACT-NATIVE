from django.urls import path
from .views import AccountListCreateView, AccountDetailView
from . import views

urlpatterns = [
    path('accounts/', AccountListCreateView.as_view(), name='account-list-create'),
    path('accounts/login/', views.LoginView.as_view(), name='account-login'),
    # path('accounts/login/', views.LoginView.as_view(), name='account-login'),
    # path('accounts/logout/', views.LogoutView.as_view(), name='account-logout'),
]


