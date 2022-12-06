from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserProfile

# Register your models here.

fields = list(UserAdmin.fieldsets)
fields[1] = ('Personal Info', {'fields': ('first_name', 'last_name', 'email', 'phone_number', 'avatar')})
UserAdmin.fieldsets = tuple(fields)

admin.site.register(UserProfile, UserAdmin)
