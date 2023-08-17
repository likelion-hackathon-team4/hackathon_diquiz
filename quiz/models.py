from datetime import timezone
from django.db import models
from django.contrib.auth.models import User
# from account import User

class Quiz(models.Model):
    quiz_id = models.AutoField(primary_key=True, db_column="quiz_id")
    user_id = models.ManyToManyField(User, on_delete=models.CASCADE, related_name="quiz", db_column="user_id")
    content = models.CharField(max_length=200)
    reference = models.CharField(max_length = 200, blank=True, null=True)
    answer = models.BooleanField(default=False)
    result = models.BooleanField(default=False)

    class Meta:
        db_table = "quiz"

class User_Quiz(models.Model):
    u_quiz_id = models.AutoField(primary_key=True, db_column="uquiz_id")
    user_id = models.ManyToManyField(User, on_delete=models.CASCADE, related_name="quiz", db_column="user_id")
    u_content = models.CharField(max_length=200)
    # u_reference = models.CharField(max_length = 200, blank=True, null=True)
    u_answer = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "user_quiz"
