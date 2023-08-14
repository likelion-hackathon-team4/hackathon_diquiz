"""
URL configuration for diquiz project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path

from post import views


urlpatterns = [

    path('board', views.board_list, name='board_list'),  # 게시물 목록 페이지(썸넬)
    path('board/<int:board_id>/', views.board_detail, name='board_detail'),  # 게시물 상세 페이지 (클릭한 해당된 게시물 페이지)
    path('board/<int:board_id>/add_comment/', views.add_comment, name='add_comment'),  # 댓글 추가
    path('board/<int:board_id>/like/', views.like_board, name='like_board'),  # 게시물 좋아요
    path('comment/<int:comment_id>/like/', views.like_comment, name='like_comment'),  # 댓글 좋아요
    path('board/create/', views.create_board, name='create_board'), # 이미지 업로드
]
# 데이터를 프론트로 보내기 (내용들)
# board url에는 내용 보내야함 백-> 프론트