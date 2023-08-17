from django.urls import path
from quiz.views import *

urlpatterns = [
    path('show/',show_page, name="show_quiz"), # 페이지 render하는 url
    path('',quiz_list, name="random_quiz"), # Json 주고받는 url
    path('<int:pk>/', update_answer, name = "user_answer"), 
    path('myquiz/', get_quiz, name = "wrong_quiz"),
    path('create_quiz/', post_uquiz, name='create_quiz'),
    path('user/',user_quizzes, name='uquiz_list'),
    path('user/list',my_quizzes, name='my_quiz'),
    path('user/<int:pk>',user_quiz, name='uquiz_detail'),
    path('update_quiz/<int:pk>',update_quiz, name='update_quiz'),
    path('delete_quiz/<int:pk>',delete_quiz, name='delete_quiz'),
]