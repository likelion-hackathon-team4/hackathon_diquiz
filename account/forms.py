from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import UserProfile


class SignUpForm(UserCreationForm):
    # Add any additional fields you want to include in the registration form
    class Meta:
        model = User
        fields = ('nickname', 'email', 'password1', 'password2')

class SignInForm(forms.Form):
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)

class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('nickname', 'profile_picture')  # Add any additional fields you want to include for profile editing

class LoginForm(forms.Form):
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)

class ProfilePictureForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['profile_picture']
        
        
        
