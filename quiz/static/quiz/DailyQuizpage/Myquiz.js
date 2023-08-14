// 퀴즈 데이터를 저장할 배열
const questions = [];

// 출제하기 버튼에 클릭 이벤트 추가
const addQuestionButton = document.querySelector('.add-question-button');
addQuestionButton.addEventListener('click', addQuizToMyList);

// 문제 리스트에서 특정 문제를 지우는 함수
function deleteQuizItem(event) {
    const quizList = document.getElementById('quiz-list');
    const itemToDelete = event.target.parentElement;
    quizList.removeChild(itemToDelete);
}

// 출제한 문제 리스트에 지우기 버튼 추가
function addDeleteButtonToQuizItem(item) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '지우기';
    deleteButton.addEventListener('click', deleteQuizItem);
    item.appendChild(deleteButton);
}

let quizCount = 0; // 퀴즈 낸 횟수 체크 
// 문제를 추가하고 출제 가능 횟수 체크하는 함수
function addQuizToMyList() {
    if (quizCount >= 3) {
        alert('최대 3문제까지 출제할 수 있습니다.');
        return;
    }
    const questionInput = document.getElementById('question-input');
    const answerInput = document.querySelector('input[name="answer"]:checked');
    const hintInput = document.getElementById('hint-input');
    const quizList = document.getElementById('quiz-list');
    const newItem = document.createElement('li');

    if (!questionInput.value || !answerInput || !hintInput.value) {
        return; // 문제, 답안 또는 힌트가 비어있으면 종료
    }


    newItem.textContent = `문제 : ${questionInput.value} 힌트 : ${hintInput.value} 정답 : ${answerInput.value}`; // 리스트 출력 형식 
    addDeleteButtonToQuizItem(newItem); // 지우기 버튼 추가
    quizList.appendChild(newItem);

    // 입력 필드 초기화
    questionInput.value = '';
    answerInput.checked = false;
    hintInput.value = '';


    //출제한 문제 수 증가
    quizCount++;

    // 최대 출제 가능 문제 수 체크
    if (quizCount >= 3) {
        alert('최대 3문제를 출제했습니다.');
    }
}
