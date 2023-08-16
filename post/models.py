from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Board(models.Model):
    title = models.CharField(max_length=200) # 게시판 제목
    content = models.TextField() # 게시판 내용
    author = models.ForeignKey(User, on_delete=models.CASCADE) # 작성자 User 모델과의 관계
    created_at = models.DateTimeField(auto_now_add=True) # 작성일자
    views = models.PositiveIntegerField(default=0) # 조회수
    likes = models.ManyToManyField(User, related_name='liked_boards', blank=True) # 게시물 좋아요 (다 대 다 관계) 
    photo = models.ImageField(upload_to='board_photos/', blank=True, null=True)  # 사진 업로드 기능 추가

class Comment(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE) # 어떤 게시물에 대한 댓글인지 (Board 모델과의 관계)
    content = models.TextField() # 댓글 내용
    author = models.ForeignKey(User, on_delete=models.CASCADE) # 작성자 (User 모델과의 관계)
    created_at = models.DateTimeField(auto_now_add=True) # 작성일자
    likes = models.ManyToManyField(User, related_name='liked_comments', blank=True) # 댓글 좋아요 (다 대 다 관계)
    
#drf, ntv
#ntv 중괄호 안에 단어 == 우리가 배운 거 백이 html을 수정해야하고, 연결시 수정했을때 문제가 생길수있다, 프론트에서도 백이 수정한 사실을 알아야함. for문으로 바꾸는 과정이 필요 list x
#drf ==  json dictionary 사전

