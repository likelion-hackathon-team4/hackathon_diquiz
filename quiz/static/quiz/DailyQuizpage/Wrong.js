// CSRF 토큰을 가져오는 함수
function getCookie(name) {
    let cookie = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return cookie ? cookie[2] : null;
}

// GET 요청을 보내고 받아온 데이터를 출력하는 함수
function fetchDataAndDisplay() {
    // CSRF 토큰을 가져옴
    const csrftoken = getCookie('csrftoken');

    // GET 요청을 보낼 URL 설정
    const url = ('quiz/myquiz/');

    // GET 요청 설정
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }
    };

    // GET 요청 보내기
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            // 데이터를 받아와서 출력
            const outputContainer = document.getElementById('output-container');
            data.forEach(item => {
                const content = item.content;
                const answer = item.answer;
                const quizDiv = document.createElement('div');
                quizDiv.innerHTML = `<p class="content">${content}</p><p class="correct">${answer}</p>`;
                outputContainer.appendChild(quizDiv);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// 호출하여 데이터 가져오기 및 출력
fetchDataAndDisplay();
