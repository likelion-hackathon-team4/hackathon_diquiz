from django.urls import path
from quiz.views import get_quiz, quiz_list, update_answer

urlpatterns = [
    path('',quiz_list, name="show_quiz"),
    path('<int:pk>/', update_answer, name = "user_answer"),
    path('/myquiz', get_quiz, name = "user_quiz"),
]