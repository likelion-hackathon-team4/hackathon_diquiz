// 백엔드 서버에 데이터를 요청하고 받아옴
fetch('quiz/myquiz/'(wrong_quiz))  // 명세서 URL로 
    .then(response => response.json())  // JSON 형태로 응답 처리
    .then(data => {
        const quizContainer = document.querySelector('.quiz-container');
        
        // 서버에서 받은 데이터를 화면에 출력.
        data.quiz_list.forEach(quiz => {
            const questionElement = document.querySelector('question');
            
            // 문제 내용 출력
            const contentElement = document.querySelector('content');
            contentElement.textContent = quiz.content;
            
            // 정답 출력
            const answerElement = document.querySelector('correct');
            answerElement.textContent = '정답 : ' + quiz.answer;
            
            questionElement.appendChild(contentElement);
            questionElement.appendChild(answerElement);
            
            quizContainer.appendChild(questionElement);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

