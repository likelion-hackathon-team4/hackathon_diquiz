from django.urls import path
from django.contrib.auth import views as auth_views
from django.conf import settings  # settings 모듈 임포트
from django.conf.urls.static import static  # static 함수 임포트
from . import views

urlpatterns = [
    path('signup/', views.signup, name="signup"),
    path('signin/', views.signin, name="signin"),
    path('logout/', views.signout, name="logout"),
    path('profile/', views.view_profile, name='profile'),
    path('edit_profile/', views.upload_profile_image, name='edit_profile'),
    path('update_intro/', views.update_intro_text, name='update_intro'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('delete_profile_image/', views.delete_profile_image, name='delete_profile_image'),
    path('point_info/', views.point_info, name='point_info'),
    path('user_point/', views.user_point, name='user_point'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

