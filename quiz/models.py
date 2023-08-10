from django.db import models

class Quiz(models.Model):
    quiz_id = models.AutoField(primary_key=True, db_column="quiz_id")
    # user_id = models.ManyToManyField(User, on_delete=models.CASCADE, related_name="quiz", db_column="user_id")
    content = models.CharField(max_length=200)
    reference = models.CharField(max_length = 200, blank=True, null=True)
    answer = models.BooleanField(default=False)
    result = models.BooleanField(default=False)

    class Meta:
        db_table = "quiz"
