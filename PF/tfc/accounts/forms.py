from django.contrib.auth import get_user_model
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.core.exceptions import ValidationError


class RegisterForm(UserCreationForm):
    username = forms.CharField(required=True, max_length=120)
    email = forms.EmailField(required=False, max_length=120)
    password1 = forms.CharField(required=True, max_length=120)
    password2 = forms.CharField(required=True, max_length=120)
    first_name = forms.CharField(required=False, max_length=120)
    last_name = forms.CharField(required=False, max_length=120)
    phone_number = forms.CharField(required=False, max_length=12)
    avatar = forms.ImageField(required=False)

    def clean(self):
        cleaned_data = super().clean()
        user_model = get_user_model()
        errors = {}
        if 'username' in cleaned_data and user_model.objects.filter(username=cleaned_data['username']).exists():
            errors['username'] = ValidationError("A user with that username already exists")
        if 'password1' in cleaned_data and len(cleaned_data['password1']) < 8:
            errors['password1'] = ValidationError("This password is too short. It must contain at least 8 characters")
        if 'password1' in cleaned_data and 'password2' in cleaned_data and cleaned_data['password1'] != cleaned_data['password2']:
            errors['password2'] = ValidationError("The two password fields didn't match")
        if errors:
            raise ValidationError(errors)
        return cleaned_data

    def save(self, commit=True):
        # We override the save method to save the first_name, last_name, and email fields
        # We do this because the UserCreationForm doesn't save these fields
        # by default and doesn't account for field additions (i.e it doesn't know about the first_name, last_name, and email fields)

        # We can do this by calling the save method of the parent class (UserCreationForm) first (with commit=False)
        # which creates a user instance without saving it and sets its username and password
        # then we can set the instance's first_name, last_name, and email fields manually and then save it
        # if commit (the argument to this method) is True

        user = super().save(commit=False)
        # self.cleaned_data is a dictionary of the form data that has been cleaned and validated
        # we can access the first_name, last_name,
        # and email fields from this dictionary and set them on the user instance
        user.first_name = self.cleaned_data["first_name"]
        user.last_name = self.cleaned_data["last_name"]
        user.email = self.cleaned_data["email"]
        user.phone_number = self.cleaned_data["phone_number"]
        user.avatar = self.cleaned_data["avatar"]
        if commit:
            user.save()
        return user
