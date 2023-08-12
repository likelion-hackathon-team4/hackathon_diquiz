import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from .models import Quiz
import random

def generate_quiz_list(quizzes, count):
    random_quizzes = random.sample(quizzes, count)
    return random_quizzes

def quiz_list(request):
    # 예시로 사용할 10개의 퀴즈와 정답 리스트
    quiz_data = [
        {"content": "디지털 격차란 정보와 기술에 접근하는 능력 및 기회에서 발생하는 사회적인 불평등을 의미합니다.", 
        "answer": True, 
        "reference": ""},
        {"content": "인터넷을 통한 정보 접근이 어려운 지역이나 사람들을 위한 기술적 해결책은 디지털 블랙아웃이라고 불립니다.", 
        "answer": False, 
        "reference": "디지털 블랙아웃은 전력이나 인프라 등의 문제로 인해 일시적으로 인터넷이 중단되는 상황을 나타냅니다."},
        {"content": "스마트폰과 같은 모바일 장치의 보급으로 디지털 격차가 줄어들었다.", 
        "answer": True, 
        "reference": ""},
        {"content": "오픈소스 소프트웨어는 누구나 접근하고 수정할 수 있는 소프트웨어를 말합니다.", 
        "answer": True, 
        "reference": ""},
        {"content": "인공지능(AI)은 기계가 사람처럼 독립적인 사고를 할 수 있도록 만드는 기술입니다.", 
        "answer": False, 
        "reference": "인공지능은 기계가 지능적인 작업을 수행하도록 만드는 기술이지만, 사고의 독립성까지는 아닙니다."},
        {"content": "코딩을 배우는 것은 주로 IT 전문가를 위한 것이며 일상적인 디지털 능력 향상에는 큰 도움이 되지 않습니다.", 
        "answer": False, 
        "reference": "코딩을 배우는 것은 일상적인 디지털 능력을 향상시키는 데 도움이 되며, 프로그래밍적 사고는 다양한 분야에서 유용합니다."},
        {"content": "클라우드 컴퓨팅은 개인 컴퓨터의 성능을 향상시키기 위한 기술입니다.", 
        "answer": False, 
        "reference": "클라우드 컴퓨팅은 인터넷을 통해 서버와 데이터를 공유하고 저장하는 기술로, 개인 및 기업의 데이터 저장 및 처리를 효율적으로 도와줍니다."},
        {"content": "사물인터넷(IoT)은 인터넷에 연결된 컴퓨터만을 의미하며 일상생활에는 적용되지 않습니다.", 
        "answer": False, 
        "reference": "사물인터넷(IoT)은 일상생활의 물건이나 기기가 인터넷에 연결되어 정보를 주고받는 기술을 의미하며 스마트 홈 등 다양한 분야에서 사용됩니다."},
        {"content": "가상현실(VR)은 컴퓨터를 사용하여 가상의 환경을 만들어내는 기술입니다.", 
        "answer": True, 
        "reference": ""},
        {"content": "소셜 미디어와 온라인 커뮤니티는 정보를 공유하고 소통하는데 유용한 도구일 뿐, 디지털 격차를 확대시키는 요인은 아닙니다.", 
        "answer": False, 
        "reference": "소셜 미디어와 온라인 커뮤니티는 접근성이 좋지만, 이를 이용하지 못하는 사람들에게 디지털 격차를 확대시킬 수 있는 가능성이 있습니다."}
    ]

    if request.method == 'GET':
        # 저장할 랜덤 퀴즈를 선택
        random_quizzes = generate_quiz_list(quiz_data, 3)

        # 선택된 랜덤 퀴즈를 퀴즈 모델에 저장
        quiz_dict = []
        for quiz_info in random_quizzes:
            quiz_instance = Quiz.objects.create(content=quiz_info["content"], answer=quiz_info["answer"], reference=quiz_info["reference"])
            # quiz_instance.user_id.add(request.user)

            # quiz_instance를 딕셔너리로 변환하여 JsonResponse로 반환
            quiz_json = {
                "quiz_id":quiz_instance.quiz_id,
                "content": quiz_instance.content,
                "answer": quiz_instance.answer,
                "reference": quiz_instance.reference
            }

            quiz_dict.append(quiz_json)

        print(quiz_dict)

        return JsonResponse({"quiz_dict": quiz_dict})
        # return render(request, "quiz_list.html", context)


def update_answer(request, pk):
    user_quiz = get_object_or_404(Quiz, quiz_id=pk)
    if request.method == 'POST':
        payment_data = json.loads(request.body)
        user_quiz.result = payment_data['result'] # 프론트에서 사용자 답변을 result로 저장해야함
        user_quiz.save()
        print(user_quiz)

        return JsonResponse("답변 저장 성공")
        # return redirect('show_quiz')

    
# 오답노트에 보여줄 데이터들 보낼 때
def get_quiz(request):
    if request.method == 'GET':
        user_quizzes = Quiz.objects.filter(answer=True)
        # user_quiz = get_object_or_404(Quiz, user_id=request.user, answer=False)
        quiz_list = []

        for quiz in user_quizzes:
            quiz_dict = {
                "quiz_id": quiz.quiz_id,
                "content": quiz.content,
                "answer": quiz.answer,
                "reference": quiz.reference
            }
            quiz_list.append(quiz_dict)

        print(quiz_list)

        return JsonResponse({"quiz_list": quiz_list})
        # return render(request, "my_quiz.html", user_quiz) #프론트 오답페이지를 my_quiz.html로



