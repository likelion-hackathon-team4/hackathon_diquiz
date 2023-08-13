// 포인트를 변경하면 progress 바 업데이트 및 현재 포인트 업데이트
function updateProgressBar(points) {
    const progressBar = document.getElementById("point-bar");
    const currentPointsValue = document.getElementById("current-points-value");

    progressBar.value = points; // 포인트 값에 따라 progress 값 설정
    currentPointsValue.textContent = points; // 현재 포인트 업데이트
}

// 초기 포인트 설정
const initialPoints = 20; // 초기 포인트 값
updateProgressBar(initialPoints);

// 예시로 포인트 업데이트
setTimeout(() => {
    const updatedPoints = 80; // 업데이트된 포인트 값
    updateProgressBar(updatedPoints);
}, 3000); // 3초 후에 포인트 업데이트
