// 퀴즈 데이터를 백엔드에서 가져와서 화면에 표시하는 함수
function loadQuizzes() {
  fetch('"quiz/" (random_quiz)')  // 백엔드에 퀴즈 데이터 요청 , 명세서 URL로 설정 
    .then(response => response.json())  // 응답을 JSON 형식으로 변환
    .then(data => {
      const quizzes = [data];  // 받아온 퀴즈 데이터 목록

      const quizContainer = document.querySelector('.quiz-container');
      quizContainer.innerHTML = '';  // 기존 내용 지우기

      quizzes.forEach(quiz => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.textContent = quiz.content;

        const answerFormDiv = document.createElement('div');
        answerFormDiv.classList.add('answer-form');
        
        const buttonTrue = document.createElement('button');
        buttonTrue.classList.add('answer-button', 'btn-true');
        buttonTrue.textContent = 'O';
        buttonTrue.addEventListener('click', () => submitAnswer(quiz.quiz_id, true)); // 사용자 답변 전송

        const buttonFalse = document.createElement('button');
        buttonFalse.classList.add('answer-button', 'btn-false');
        buttonFalse.textContent = 'X';
        buttonFalse.addEventListener('click', () => submitAnswer(quiz.quiz_id, false)); // 사용자 답변 전송
        
        answerFormDiv.appendChild(buttonTrue);
        answerFormDiv.appendChild(buttonFalse);

        quizContainer.appendChild(questionDiv);
        quizContainer.appendChild(answerFormDiv);
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
  })
  .catch(error => {
    console.error('답변 전송 오류:', error);
  });
}

// 버튼 클릭 시 퀴즈 데이터 로드
const loadButton = document.querySelector('.btn-load');
loadButton.addEventListener('click', loadQuizzes);

// 초기 로딩 시 퀴즈 데이터 로드
loadQuizzes();
