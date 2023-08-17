// CSRF 토큰을 가져오는 함수
function getCookie(name) {
  // 정규식을 사용하여 쿠키에서 특정 이름의 쿠키 값을 찾아 반환
  let cookie = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return cookie ? cookie[2] : null; // 찾은 쿠키 값 또는 null 반환
}
let currentQuizIndex = 0;  // 현재 퀴즈 인덱스 변수 추가
let points = 0; // 초기 포인트 설정

// 퀴즈 데이터를 로드하고 화면에 퀴즈를 표시하는 함수
function loadQuizzes() {
  fetch('/quiz/')  // 백엔드에 퀴즈 데이터 요청, 명세서 URL로 설정 
    .then(response => response.json())  // 응답을 JSON 형식으로 변환
    .then(data => {
      const quizzes = data.quizzes;  // 받아온 퀴즈 데이터 목록

      const quizContainer = document.querySelector('.quiz-container');
      quizContainer.innerHTML = '';  // 기존 내용 지우기

      // 현재 퀴즈를 화면에 표시하는 함수
      function loadCurrentQuiz() {
        if (currentQuizIndex < quizzes.length) {
          const quiz = quizzes[currentQuizIndex];

          // 퀴즈 내용을 표시하는 요소 생성 및 설정
          const questionDiv = document.createElement('div');
          questionDiv.classList.add('question');
          questionDiv.textContent = quiz.content;
          quizContainer.appendChild(questionDiv);

          // 사용자의 답변을 입력할 수 있는 폼 요소 생성 및 설정
          const answerFormDiv = document.createElement('div');
          answerFormDiv.classList.add('answerForm')
          quizContainer.appendChild(answerFormDiv);

          // O 버튼 생성 및 클릭 이벤트 설정
          const buttonTrue = document.createElement('button');
          buttonTrue.classList.add('answer-button');
          buttonTrue.classList.add('btn-true');
          buttonTrue.textContent = 'O';
          buttonTrue.addEventListener('click', () => {
            submitAnswer(quiz.quiz_id, quiz.answer, true, quiz.reference);
            buttonTrue.disabled = true; // O 버튼 비활성화
            buttonFalse.disabled = true; // X 버튼도 비활성화
          });
          answerFormDiv.appendChild(buttonTrue);

          // X 버튼 생성 및 클릭 이벤트 설정
          const buttonFalse = document.createElement('button');
          buttonFalse.classList.add('answer-button');
          buttonFalse.classList.add('btn-false');
          buttonFalse.textContent = 'X';
          buttonFalse.addEventListener('click', () => {
            submitAnswer(quiz.quiz_id, quiz.answer, false, quiz.reference);
            buttonTrue.disabled = true; // O 버튼 비활성화
            buttonFalse.disabled = true; // X 버튼도 비활성화
          });
          answerFormDiv.appendChild(buttonFalse);

          // 다음 문제로 넘어가는 버튼 생성 및 클릭 이벤트 설정
          const buttonNext = document.createElement('button');
          buttonNext.classList.add('next-button');
          buttonNext.textContent = '다음 문제';
          buttonNext.addEventListener('click', loadNextQuiz);
          quizContainer.appendChild(buttonNext);

        } else {
          // 모든 퀴즈를 푼 경우 마지막 메시지 표시
          const endMessageDiv = document.createElement('div');
          endMessageDiv.classList.add('end-message');
          endMessageDiv.textContent = "모든 퀴즈를 푸셨습니다!";
          quizContainer.appendChild(endMessageDiv);
        }
      }

      // 다음 문제로 넘어가는 함수
      function loadNextQuiz() {
        currentQuizIndex++;
        quizContainer.innerHTML = '';  // 기존 내용 지우기
        loadCurrentQuiz();
      }

      loadCurrentQuiz();  // 현재 퀴즈 로드 함수 호출
      // "다시시작" 버튼 클릭 시 퀴즈를 다시 시작하는 함수
      const buttonReset = document.querySelector('.btn-reset');
      buttonReset.addEventListener('click', resetQuiz);

      function resetQuiz() {
        currentQuizIndex = 0; // 퀴즈 인덱스 초기화
        points = 0; // 포인트 초기화
        const pointsDisplay = document.querySelector('.points');
        pointsDisplay.textContent = '획득 포인트 : 0점'; // 포인트 표시 업데이트
        const quizContainer = document.querySelector('.quiz-container');
        quizContainer.innerHTML = ''; // 기존 내용 지우기
        loadCurrentQuiz(); // 첫 번째 문제 로드
      }
        // "다른문제" 버튼 클릭 시 다음 문제 로드 함수 호출
      const buttonNext = document.querySelector('.btn-next');
      buttonNext.addEventListener('click', loadNextQuiz);
    })
    .catch(error => {
      console.error('퀴즈 데이터 가져오기 오류:', error);
    });
}

// 퀴즈 로드 함수 호출하여 실행 시작
loadQuizzes();

// 퀴즈를 제출하고 결과를 처리하는 함수
function submitAnswer(quizId, correctAnswer, userAnswer, reference) {
  // 제출할 데이터 생성
  const data = {
    quiz_id: quizId,
    user_answer: userAnswer
  };

  // 백엔드에 데이터 전송
  url = `/quiz/${encodeURIComponent(quizId)}/`;

  fetch(url, {
    method: 'POST',
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {

    // 사용자의 답변과 정답 비교 후 결과 표시
    if (userAnswer === correctAnswer) {
      console.log("정답입니다 !");
      showPointsEarned(); // 정답인 경우 축하 메시지 표시
      increasePoints(); // 포인트 증가
    } else {
      console.log("오답입니다.");
      showIncorrectAnswer(reference); // 오답인 경우 오답 메시지와 참고 정보 표시
    }
  })
  .catch(error => {
    console.error('답변 전송 오류:', error);
  });
}

function sendPoints(points) {
  url = '/quiz/points/'; // 포인트 정보를 보낼 백엔드 엔드포인트 URL

  const data = {
    points: points
  };

  fetch(url, {
    method: 'POST',
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log('포인트 정보 전송 완료:', data);
  })
  .catch(error => {
    console.error('포인트 정보 전송 오류:', error);
  });
}



// 퀴즈 결과에 따라 포인트를 증가시키는 함수
function increasePoints() {
points += 10; // 맞출 때마다 10점 증가
const pointsDisplay = document.querySelector('.points');
pointsDisplay.textContent = `획득 포인트 : ${points}점`; // 포인트 업데이트
sendPoints(points); // 포인트 정보를 백엔드로 보냄 
}

// 오답 메시지와 참고 정보를 표시하는 함수
function showIncorrectAnswer(reference) {
  const quizContainer = document.querySelector('.quiz-container');
  const referenceDiv = document.createElement('div');
  referenceDiv.classList.add('result');
  referenceDiv.textContent = `오답입니다! ${reference}`;
  quizContainer.appendChild(referenceDiv);
}

// 축하 메시지를 표시하는 함수
function showPointsEarned() {
  const quizContainer = document.querySelector('.quiz-container');
  const pointsDiv = document.createElement('div');
  pointsDiv.classList.add('result');
  pointsDiv.textContent = "축하합니다! 정답입니다!";
  quizContainer.appendChild(pointsDiv);
}