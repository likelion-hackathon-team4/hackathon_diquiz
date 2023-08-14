fetch('/get-quiz-data/')  // 백엔드에 퀴즈 데이터 요청
  .then(response => response.json())  // 응답을 JSON 형식으로 변환
  .then(data => {
    const quizList = data.quiz_list;  // 받아온 퀴즈 데이터 목록

    const quizContainer = document.querySelector('.quiz-container');
    quizList.forEach(quiz => {
      // 문제에 대한 <div> 요소 생성
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');
      questionDiv.textContent = quiz.content;  // 문제 내용 추가

      // 답변 양식에 대한 <div> 요소 생성
      const answerFormDiv = document.createElement('div');
      answerFormDiv.classList.add('answer-form');

      // "O" 버튼 생성 (True)
      const buttonTrue = document.createElement('button');
      buttonTrue.classList.add('answer-button', 'btn-true');
      buttonTrue.textContent = 'O';

      // "X" 버튼 생성 (False)
      const buttonFalse = document.createElement('button');
      buttonFalse.classList.add('answer-button', 'btn-false');
      buttonFalse.textContent = 'X';

      // 버튼을 답변 양식에 추가
      answerFormDiv.appendChild(buttonTrue);
      answerFormDiv.appendChild(buttonFalse);

      // 문제와 답변 양식을 퀴즈 컨테이너에 추가
      quizContainer.appendChild(questionDiv);
      quizContainer.appendChild(answerFormDiv);
    });
  })
  .catch(error => {
    console.error('퀴즈 데이터 가져오기 오류:', error);
  });
