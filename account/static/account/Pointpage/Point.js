// 포인트를 변경하면 progress 바 업데이트 및 현재 포인트 업데이트
function updateProgressBar(points) {
    // HTML 요소들을 가져옵니다.
    const progressBar = document.getElementById("point-bar"); // 프로그레스 바 요소
    const currentPointsValue = document.getElementById("current-points-value"); // 현재 포인트 값을 보여주는 요소

    // 프로그레스 바의 값과 현재 포인트 텍스트 업데이트
    progressBar.value = points; // 포인트 값에 따라 프로그레스 바 값 설정
    currentPointsValue.textContent = points; // 현재 포인트 업데이트
}

// 초기 포인트 설정
const initialPoints = 0; // 초기 포인트 값
updateProgressBar(initialPoints); // 초기 포인트로 프로그레스 바와 텍스트 업데이트

// 서버에서 포인트 정보 가져와 업데이트하는 함수
function fetchAndUpdatePoints() {
    fetch('point_info') // 서버의 API 엔드포인트로 요청을 보냅니다.
        .then(response => response.json()) // JSON 형식의 응답을 파싱합니다.
        .then(data => {
            const points = data.points; // 서버에서 받은 포인트 값을 가져옵니다.
            updateProgressBar(points); // 업데이트된 포인트 값으로 프로그레스 바와 텍스트 업데이트
        })
        .catch(error => {
            console.error('포인트 가져오기 오류:', error); // 오류 발생 시 콘솔에 오류 메시지 출력
        });
}

// 문서가 로드되면 실행되는 함수
document.addEventListener('DOMContentLoaded', () => {
    // 초기 포인트 값을 설정하고 프로그레스 바와 텍스트 업데이트
    const initialPoints = 0;
    updateProgressBar(initialPoints);

    // 일정 시간 후에 포인트 업데이트 함수 호출 (예: 3초 후)
    setTimeout(fetchAndUpdatePoints, 3000);
});
