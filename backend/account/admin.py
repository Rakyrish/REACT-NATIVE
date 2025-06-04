from django.contrib import admin
from .models import Account


admin.register_models = admin.site.register(Account
)

# Register your models here.
