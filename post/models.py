from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Board(models.Model):
    title = models.CharField(max_length=200) #게시판 제목
    content = models.TextField() # 게시판 내용
    author = models.ForeignKey(User, on_delete=models.CASCADE) #작성자 User 모델과의 관계
    created_at = models.DateTimeField(auto_now_add=True) #작성일자
    views = models.PositiveIntegerField(default=0) #조회수
    likes = models.ManyToManyField(User, related_name='liked_boards', blank=True) #게시물 좋아요 (다 대 다 관계)
    photo = models.ImageField(upload_to='board_photos/', blank=True, null=True)  # 사진 업로드 기능 추가

class Comment(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE) # 어떤 게시물에 대한 댓글인지 (Board 모델과의 관계)
    content = models.TextField() # 댓글 내용
    author = models.ForeignKey(User, on_delete=models.CASCADE) # 작성자 (User 모델과의 관계)
    created_at = models.DateTimeField(auto_now_add=True) # 작성일자
    likes = models.ManyToManyField(User, related_name='liked_comments', blank=True) # 댓글 좋아요 (다 대 다 관계)

