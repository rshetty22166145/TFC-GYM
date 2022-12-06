from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager

# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, email, phone_number, password, **extra_fields):
        user = self.model(email=email, phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save()
        return user


class UserProfile(AbstractUser):
    phone_number = models.CharField(max_length=120, blank=True, null=True)
    avatar = models.ImageField(blank=True, null=True, upload_to='images/')
