// 퀴즈 데이터를 백엔드에서 가져와서 화면에 표시하는 함수
function loadQuizzes() {
  fetch('"quiz/" (random_quiz)')  // 백엔드에 퀴즈 데이터 요청 , 명세서 URL로 설정 
    .then(response => response.json())  // 응답을 JSON 형식으로 변환
    .then(data => {
      const quizzes = [data];  // 받아온 퀴즈 데이터 목록

      const quizContainer = document.querySelector('.quiz-container');
      quizContainer.innerHTML = '';  // 기존 내용 지우기

      quizzes.forEach(quiz => {
        const questionDiv = document.querySelector('question');
        questionDiv.textContent = quiz.content;
        
        const buttonTrue = document.querySelector('answer-button btn-true');
        buttonTrue.addEventListener('click', () => submitAnswer(quiz.quiz_id, true)); // 사용자 답변 전송

        const buttonFalse = document.querySelector('answer-button btn-false');
        buttonFalse.addEventListener('click', () => submitAnswer(quiz.quiz_id, false)); // 사용자 답변 전송
        
      });
    })
    .catch(error => {
      console.error('퀴즈 데이터 가져오기 오류:', error);
    });
}

// 사용자 답변을 백엔드 서버로 전송하는 함수
function submitAnswer(quizId, answer) {
  const data = {
    quiz_id: quizId,
    user_answer: answer
  };

  fetch('"quiz/" (random_quiz)', { // 명세서 URL로 설정 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    // 서버 응답 처리
    console.log(data);

    if (data.answer) {
      showPointsEarned();
    }
  })
  .catch(error => {
    console.error('답변 전송 오류:', error);
  });
}

function showHint(hintText) { // 힌트 보여주기 함수 
  const hintDiv = document.querySelector('question');
  hintDiv.textContent = hintText;
  
  // 일정 시간 후 힌트 제거
  setTimeout(() => {
    hintDiv.remove();
  }, 3000); // 3초 후 힌트 제거
}
// 퀴즈 정답 판별후 맞으면 실행되는 함수 
function showPointsEarned() {
  const quizContainer = document.querySelector('.quiz-container');
  const pointsDiv = document.createElement('div');
  pointsDiv.textContent = "정답입니다! 10포인트가 적립되었습니다!";
  quizContainer.appendChild(pointsDiv);
}
// 다시시작 버튼 클릭 시 퀴즈 데이터 로드
const loadButton = document.querySelector('hint-button btn-reset');
loadButton.addEventListener('click', loadQuizzes);

// 힌트보기 버튼 
const buttonHint = document.querySelector('hint-button btn-hint');
buttonHint.addEventListener('click', () => showHint(quiz.reference)); // 힌트 보기 기능 호출

// 초기 로딩 시 퀴즈 데이터 로드
loadQuizzes();
