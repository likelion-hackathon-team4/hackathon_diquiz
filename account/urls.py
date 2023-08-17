from django.urls import path
from . import views
from django.urls import path
from . import views
from django.urls import path

from django.contrib.auth import views as auth_views

from django.urls import path
from . import views



urlpatterns = [
    path('signup/',views.signup, name="signup"),
    path('signin/',views.signin, name="signin"),
    path('logout/',views.signout, name="logout"),
    path('profile/', views.view_profile, name='profile'),
    path('edit_profile/', views.upload_profile_image, name='edit_profile'),
    path('update_intro/', views.update_intro_text, name='update_intro'),
    path('point/', views.point_page, name='point_page'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
]

