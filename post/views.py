from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Board, Comment
from .forms import BoardForm

# Create your views here.

def board_list(request):
    boards = Board.objects.all() # 모든 게시물 조회
    print(boards)
    return render(request, 'post/communitypage.html', {'boards': boards})

def board_detail(request, board_id):
    board = get_object_or_404(Board, pk=board_id) # 해당 게시물 가져오기
    board.views += 1 # 조회수 증가
    board.save()
    know_like = board.likes.filter(id=request.user.id).exists()
    return render(request, 'post/view.html', {'board': board,'know_like': know_like, })
 

@login_required # 로그인한 사용자만 접근할 수 있는 뷰입니다.
def add_comment(request, board_id):
    board = get_object_or_404(Board, pk=board_id) # 해당 게시물 가져오기
    if request.method == 'POST':
        content = request.POST['content']
        Comment.objects.create(board=board, content=content, author=request.user) # 댓글 생성
    return redirect('board_detail', board_id=board_id)

@login_required
def like_board(request, board_id):
    board = get_object_or_404(Board, pk=board_id) # 해당 게시물 가져오기
    if request.user in board.likes.all():
        board.likes.remove(request.user) # 이미 좋아요를 누른 경우 취소
    else:
        board.likes.add(request.user) # 좋아요 추가
    return redirect('board_detail', board_id=board_id)

@login_required
def like_comment(request, comment_id):
    comment = get_object_or_404(Comment, pk=comment_id) # 해당 댓글 가져오기
    if request.user in comment.likes.all():
        comment.likes.remove(request.user) # 이미 좋아요를 누른 경우 취소
    else:
        comment.likes.add(request.user) # 좋아요 추가
    return redirect('board_detail', board_id=comment.board.id)

@login_required  
def create_board(request):
    if request.method == 'POST':
        form = BoardForm(request.POST, request.FILES)  # BoardForm 인스턴스를 생성하고 요청 데이터와 파일을 전달합니다.
        if form.is_valid():  # 폼의 데이터가 유효한지 검사합니다.
            board = form.save(commit=False)  # 폼으로부터 받은 데이터를 가지고 새로운 Board 모델 인스턴스를 생성합니다.
            board.author = request.user  # 생성한 게시물의 작성자를 현재 로그인한 사용자로 설정합니다.
            board.save()  # 변경된 내용을 저장합니다.
            return redirect('board_detail', board_id=board.id)  # 해당된 게시판으로 이동합니다.
    else:
        form = BoardForm()  # GET 요청인 경우 빈 BoardForm 인스턴스를 생성합니다. =게시판 생성 버튼을 눌렀을때
    return render(request, 'post/write.html')

@login_required
def edit_board(request, board_id): # 게시물 수정
    board = get_object_or_404(Board, pk=board_id) # 해당 게시물 가져오기

    if request.method == 'POST':
        form = BoardForm(request.POST, request.FILES, instance=board) # 기존 게시물 데이터를 폼에 전달합니다.
        if form.is_valid():
            form.save()
            return redirect('board_detail', board_id=board_id)
    elif request.method == 'GET': 
        board = get_object_or_404(Board, pk=board_id)
        # form = BoardForm(instance=board) # GET 요청인 경우 기존 게시물 데이터를 폼에 전달합니다.

    return render(request, 'post/edit.html', {'board': board})

@login_required
def delete_board(request, board_id): # 게시물 삭제
    board = get_object_or_404(Board, pk=board_id) # 해당 게시물 가져오기

    if board.author.id == request.user.id: 
        
        board.delete()
        return redirect('board_list')

    return redirect('board_detail', board_id=board_id)