import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate

from quiz.models import Quiz
from .forms import SignUpForm, SignInForm
from django.contrib import messages
from .models import User, UserProfile
from .forms import UserForm
from django.shortcuts import render
from .forms import LoginForm
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from account.forms import ProfilePictureForm
from account.forms import PointUpdateForm
from django.contrib.auth.decorators import login_required
from .models import User
from .forms import PointUpdateForm
from django.contrib.auth.decorators import login_required
from .models import Point
from .forms import PointInfoForm




@login_required
def delete_profile_image(request):
    user = request.user
    try:
        user_profile = UserProfile.objects.get(user=user)
        if user_profile.profile_picture:
            user_profile.profile_picture.delete()  # Delete the profile picture file
            user_profile.profile_picture = None     # Clear the profile_picture field in the model
            user_profile.save()
        return redirect('profile')  # Redirect to the profile page after deletion
    except UserProfile.DoesNotExist:
        return redirect('profile')  # Redirect to the profile page if user profile doesn't exist


def signup(request):
    if request.method == 'GET':
        form = SignUpForm()

    elif request.method == 'POST':
        print("회원가입 실패0")
        form = SignUpForm(request.POST)
        print("회원가입 실패1")
        print(form)
        if form.is_valid():
            user = form.save()
            print("회원가입완료")
            login(request, user)
            return redirect('profile')
        print("회원가입 실패2")
        
    return render(request, 'account/registerpage.html', {'form': form})

def signin(request):
    if request.method == 'GET':
        form = SignInForm() 
        
    elif request.method == 'POST':
        form = SignInForm(data=request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password')
            user = authenticate(request, email=email, password=password)

            #return redirect('/profile/')
            if user is not None:
                print("login")
                login(request, user)
                #return redirect('/quiz/show/')
                return redirect('profile')  # 로그인 후 프로필 페이지로 이동
    else:
        print("login nono")
        messages.error(request, '로그인에 실패하였습니다.')  # 실패 시 메시지 표시
            
    return render(request, 'account/mainlogin.html', {'form': form})

def signout(request):
    logout(request)
    return redirect('signin')  # 로그아웃시 mainlogin 페이지로 이동 (mainlogin.html 사용)


# 여기 부터는 프로필 수정 페이지 입니다.

def view_profile(request):
    profile = request.user
    return render(request, 'account/profile.html', {'profile': profile})


from django.shortcuts import render, redirect
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from .forms import UserForm  # UserForm은 프로필 이미지 업로드를 위한 폼이라 가정합니다

def upload_profile_image(request):
    user = request.user
    if request.method == 'POST':
        form = UserForm(request.POST, request.FILES)
        if form.is_valid():
            new_nickname = form.cleaned_data.get('nickname')
            profile_image = form.cleaned_data.get('profile_picture')
            
            if new_nickname:
                user.nickname = new_nickname
                user.save()
            
            if profile_image:
                # 파일 저장을 위한 파일 시스템 저장소 설정
                fs = FileSystemStorage(location=settings.MEDIA_ROOT)
                
                # 업로드된 파일을 임시 디렉토리에서 영구적으로 저장
                profile_image_path = fs.save(profile_image.name, profile_image)
                
                # 사용자 모델의 profile_picture 필드에 파일 경로 저장
                user.profile_picture = profile_image_path
                user.save()
            
            return redirect('profile')  # 등록 후에 프로필 페이지로 리디렉션
    
    else:
        form = UserForm(instance=user.profile)
    
    return render(request, 'account/profile.html', {'form': form, 'profile': user.profile})

def update_intro_text(request):
    user = request.user              # 상태메시지 또는 자기소개글 등록
    profile = User.objects.get(user=user)
    
    if request.method == 'POST':
        intro_text = request.POST.get('intro_text')
        if intro_text:
            profile.intro_text = intro_text
            profile.save()
            return redirect('view_profile')  # 프로필 페이지로 리디렉션
    
    return render(request, 'account/profile.html', {'profile': profile})  # 등록 후에 다시 프로필 페이지를 리디렉션



def login_view(request):
    if request.method == 'POST':    #mainlogin.html 로그인
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            user = authenticate(request, email=form.cleaned_data['email'], password=form.cleaned_data['password'])
            if user is not None:
                login(request, user)
                return redirect('profile')  # 로그인 성공 시 프로필 페이지로 리디렉션
    else:
        form = LoginForm()

    return render(request, 'account/mainlogin.html', {'form': form})


def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)   #register_page.html 사용
        if form.is_valid():
            user = form.save()
            login(request, user)  # 회원가입 후 자동 로그인
            return redirect('view_point')  # 회원가입 성공 시 포인트 페이지로 리다이렉션
    else:
        form = UserCreationForm()

    return render(request, 'account/registerpage.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
            if user is not None:
                login(request, user)
                return redirect('view_point')  # 로그인 성공 시 포인트 페이지로 리다이렉션
    else:
        form = LoginForm()

    return render(request, 'mainlogin.html', {'form': form})


@login_required  # 로그인한 사용자만 접근 가능하도록 설정
def profile(request):
    user = request.user
    
    if request.method == 'POST':
        form = ProfilePictureForm(request.POST, request.FILES, instance=user)
        if form.is_valid():
            form.save()
            return redirect('profile')  # 업로드 후 프로필 페이지로 리디렉션
    else:
        form = ProfilePictureForm(instance=user)
    
    return render(request, 'profile.html', {'form': form})


# 자바스트립트 언어, json 이해 필요. (추가 리펙토링 꼭 필수)
@login_required                               
def point_info(request):
    user = get_object_or_404(User, email=request.user)
    if request.method == "POST":
        add_point = json.loads(request.body)["points"]
        user.points += add_point
        user.save()
    return render(request, 'account/Pointpage.html', {'user': user})

# @login_required
# def update_point(request):
#     if request.method == 'POST':
#         form = PointUpdateForm(request.POST)
#         if form.is_valid():
#             new_point = form.cleaned_data['new_point']
#             user = request.user
#             user.user_point = new_point
#             user.save()
#             return redirect('point_info')  # 포인트 정보 페이지로 리디렉션
#     else:
#         form = PointUpdateForm()

#     return render(request, 'account/Pointpage.html', {'form': form})



# # @login_required
# def point_info_view(request, pk):
#     # user_quiz = get_object_or_404(Quiz, quiz_id=pk)
#     # if request.method == 'POST':
#     #     payment_data = json.loads(request.body)

#     #     ans = payment_data['point_info']

#     #     if user_quiz.answer == ans:
#     #         user_quiz.result = True
#     #         user_quiz.save()

#     #         # 포인트 적립 로직 추가
#     #         point_amount = 10  # 포인트 적립량
#     #         user = request.user

#     #         # 사용자의 포인트 정보 가져오기
#     #         user_point, created = Point.objects.get_or_create(user=user)
            
#     #         # 적립된 포인트 추가
#     #         user_point.amount += point_amount
#     #         user_point.save()

#     #     return JsonResponse({"message": "답변 저장 및 포인트 적립 성공"})

#     return HttpResponse('<h1>fuck</h1>')



def user_point(request):
    user_point = get_object_or_404(User, id=request.user.id)
    
    if request.method == 'POST':
        payment_data = json.loads(request.body)
        point = payment_data['point_info']
        
        user_point.user_point += point
        user_point.save()

        return JsonResponse({"message": "저장 성공"})

    return redirect('random_quiz')