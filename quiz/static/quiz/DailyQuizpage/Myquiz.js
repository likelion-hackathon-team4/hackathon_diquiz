// CSRF 토큰을 가져오는 함수
function getCookie(name) {
  // 정규식을 사용하여 쿠키에서 특정 이름의 쿠키 값을 찾아 반환
  let cookie = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return cookie ? cookie[2] : null; // 찾은 쿠키 값 또는 null 반환
}

let currentQuizIndex = 0; // 현재 퀴즈 인덱스 변수 추가

// 퀴즈 데이터를 로드하고 화면에 퀴즈를 표시하는 함수
function loadQuizzes() {
  fetch('/quiz/user/') // 백엔드에 퀴즈 데이터 요청, 명세서 URL로 설정
    .then(response => response.json()) // 응답을 JSON 형식으로 변환
    .then(data => {
      const quizzes = data.uquiz_list; // 받아온 퀴즈 데이터 목록

      const quizContainer = document.querySelector('.quiz-container');
      quizContainer.innerHTML = ''; // 기존 내용 지우기

      // "축하 메시지를 표시하는 함수"
      function showPointsEarned() {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        resultDiv.textContent = '축하합니다! 정답입니다!';
        quizContainer.appendChild(resultDiv);
      }
      function submitAnswer(_quizId, correctAnswer, userAnswer, reference) {
          // 서버에 답변을 제출하고 정오답 여부를 확인하는 로직을 추가해야 함
          // 서버 응답에 따라 아래 함수들을 호출하여 메시지를 표시할 수 있음
          if (userAnswer === correctAnswer) {
            showPointsEarned();
          } else {
            showIncorrectAnswer(reference);
          }
        }

      // "오답 메시지와 참고 정보를 표시하는 함수"
      function showIncorrectAnswer(reference) {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        resultDiv.textContent = `오답입니다! ${reference}`;
        quizContainer.appendChild(resultDiv);
      }

      // 현재 퀴즈를 화면에 표시하는 함수
      function loadCurrentQuiz() {
        if (currentQuizIndex < quizzes.length) {
          const quiz = quizzes[currentQuizIndex];

          // 퀴즈 내용을 표시하는 요소 생성 및 설정
          const questionDiv = document.createElement('div');
          questionDiv.classList.add('question');
          questionDiv.textContent = quiz.u_content;
          quizContainer.appendChild(questionDiv);

          // 사용자의 답변을 입력할 수 있는 폼 요소 생성 및 설정
          const answerFormDiv = document.createElement('div');
          answerFormDiv.classList.add('answerForm');
          quizContainer.appendChild(answerFormDiv);

          // O 버튼 생성 및 클릭 이벤트 설정
          const buttonTrue = document.createElement('button');
          buttonTrue.classList.add('answer-button');
          buttonTrue.classList.add('btn-true');
          buttonTrue.textContent = 'O';
          buttonTrue.addEventListener('click', () => {
            submitAnswer(quiz.u_quiz_id, quiz.u_answer, true, quiz.u_reference);
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
            submitAnswer(quiz.u_quiz_id, quiz.u_answer, false, quiz.u_reference);
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
          endMessageDiv.textContent = '모든 퀴즈를 푸셨습니다!';
          quizContainer.appendChild(endMessageDiv);
        }
      }

      // 다음 문제로 넘어가는 함수
      function loadNextQuiz() {
        currentQuizIndex++;
        quizContainer.innerHTML = ''; // 기존 내용 지우기
        loadCurrentQuiz();
      }

      // "다시시작" 버튼 클릭 시 퀴즈를 다시 시작하는 함수
      const buttonReset = document.querySelector('.btn-reset');
      buttonReset.addEventListener('click', resetQuiz);

      function resetQuiz() {
        currentQuizIndex = 0; // 퀴즈 인덱스 초기화
        const pointsDisplay = document.querySelector('.points');
        pointsDisplay.textContent = '획득 포인트 : 0점'; // 포인트 표시 업데이트
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
   loadCurrentQuiz();