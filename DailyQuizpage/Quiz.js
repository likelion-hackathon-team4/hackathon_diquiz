const questions = [ // 퀴즈 문제들 
  {
    question: "HTML은 웹 페이지의 구조를 정의하는 언어이다.",
    correctAnswer: true,
    hint: "HTML은 하이퍼텍스트 마크업 언어입니다.",
  },
  {
    question: "비트코인의 창시자는 우즈마키 나루토다.",
    correctAnswer: false,
    hint: "비트코인의 창시자는 사토시 나카모토입니다.",
  },
  {
    question: "IOT는 사물인터넷을 뜻하는 용어이다.",
    correctAnswer: true,
    hint: "Internet of things의 약자 입니다.",
  },
  {
    question: "이커머스는 쿠팡,지마켓 등 전자상거래 서비스를 말한다.",
    correctAnswer: true,
    hint: "이커머스는 제품이나 용역을 사고 파는 거래행위입니다.",
  },
  {
    question: "NFT는 동일품이 존재할 수 있다.",
    correctAnswer: false,
    hint: "NFT는 대체 불가능한 토큰을 의미합니다.",
  },
  {
    question: "디지털 격차란 디지털이 보편화되면서 디지털 정보화 수준에 따라 격차가 커지는 것을 의미한다.",
    correctAnswer: true,
    hint: "디지털의 정보화 수준에 따라 차이가 발생할 수 있습니다.",
  },
  {
    question: "CSS는 웹 페이지의 스타일을 정의하는 언어이다.",
    correctAnswer: true,
    hint: "CSS는 Cascading Style Sheets의 약자입니다.",
  },
  {
    question: "JavaScript는 웹 페이지의 동적인 기능을 담당하는 언어이다.",
    correctAnswer: true,
    hint: "JavaScript는 웹 개발에서 가장 널리 사용되는 프로그래밍 언어 중 하나입니다.",
  },
  {
    question: "URL은 'Universal Resource Locator'의 약자이다.",
    correctAnswer: true,
    hint: "URL은 인터넷 상에서 리소스의 위치를 나타내는 주소입니다.",
  },
  {
    question: "암호화폐 거래소인 빗썸은 한국에서 가장 오래된 거래소 중 하나이다.",
    correctAnswer: true,
    hint: "빗썸은 2013년에 설립되었습니다.",
  },
  {
    question: "HTTP는 'HyperText Transfer Protocol Secure'의 약자이다.",
    correctAnswer: false,
    hint: "HTTP는 'HyperText Transfer Protocol'의 약자이며, HTTPS가 보안을 추가한 버전입니다.",
  },
  // 다른 문제들도 같은 형식으로 추가 가능
  // {
  //   question: "다른 문제",
  //   correctAnswer: true or false,
  //   hint: "힌트 문구",
  // },
];

const questionElement = document.querySelector(".question");
const nextPage = document.querySelector('.next-page');
const trueButton = document.querySelector(".btn-true");
const falseButton = document.querySelector(".btn-false");
const hintButton = document.querySelector(".btn-hint");
const nextButton = document.querySelector(".btn-next");
const resetButton = document.querySelector(".btn-reset");
const pointsElement = document.querySelector(".points");

let totalPoints = 0; // 전체 포인트 초기화
let currentQuestionIndex = 0; // 현재 문제의 인덱스 초기화

trueButton.addEventListener("click", () => {
  // O 버튼을 눌렀을때 처리
  handleAnswer(true);
});

falseButton.addEventListener("click", () => {
  // X버튼을 눌렀을때 처리
  handleAnswer(false);
});

hintButton.addEventListener("click", () => {
  showHint(); // 힌트 표시 함수 호출
});

nextButton.addEventListener("click", () => {
  showNextQuestion(); // 다음 문제 표시 함수 호출
});

resetButton.addEventListener("click", () => {
  initializeQuiz(); // 퀴즈 다시 시작
});

function showHint() {
  // 힌트를 보여주는 기능을 추가할 수 있다.
  questionElement.textContent = questions[currentQuestionIndex].hint;
  setTimeout(() => { // 힌트 3초동안 보여주고 원래화면으로 되돌리기
    questionElement.textContent = questions[currentQuestionIndex].question;
  }, 3000);
}
function initializeQuiz () {
  shuffleArray(questions);
  resetQuiz();
}

function resetQuiz() {
  totalPoints = 0; // 전체 포인트 초기화
  currentQuestionIndex = 0; // 현재 문제의 인덱스 초기화
  trueButton.disabled = false; // O 버튼 활성화
  falseButton.disabled = false; // X 버튼 활성화
  hintButton.disabled = false; // 힌트 버튼 활성화
  nextButton.disabled = false; // 다음 문제 버튼 활성화
  pointsElement.textContent = `획득 포인트 : ${totalPoints}점`; // 포인트 초기화
  nextPage.textContent = ""; // 다음 문제 메시지 초기화
  showNextQuestion(); // 첫 번째 문제 표시
}

function showNextQuestion() {
  if (currentQuestionIndex < questions.length - 6) {
    currentQuestionIndex++; // 다음 문제로 인덱스 증가
    questionElement.textContent = questions[currentQuestionIndex].question;
    nextPage.textContent = ""; // 다음 문제 표시 초기화
  } else {
    questionElement.textContent = "모든 문제를 풀었습니다. 수고하셨습니다!";
    nextPage.textContent = ""; // 마지막 문제 표시 초기화
    trueButton.disabled = true; // 문제 풀이 버튼 비활성화
    falseButton.disabled = true; // 문제 풀이 버튼 비활성화
    hintButton.disabled = true; // 힌트 버튼 비활성화
    nextButton.disabled = true; // 다음 문제 버튼 비활성화
  }
}

function handleAnswer(selectedAnswer) {
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  if (selectedAnswer === correctAnswer) { // 사용자가 선택한 답과 정답을 비교
    updatePoints(); // 포인트 업데이트
    showNextQuestion(); // 정답일 경우 다음 문제로 넘어갑니다.
  } else {
    nextPage.textContent = "다시 한번 생각해 보세요. 오답입니다!";
  }
}

function shuffleArray(array) { // 피셔-예이츠 셔플 알고리즘 >> 퀴즈를 랜덤으로 섞어준다.
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(questions); // 퀴즈를 랜덤으로 섞는다 .

function updatePoints() {
  totalPoints++; // 정답일 경우 포인트 증가
  nextPage.textContent = "축하합니다. 정답입니다! 1포인트를 획득하셨습니다.";
  pointsElement.textContent = `획득 포인트 : ${totalPoints}점`;
}

// 초기 문제 설정
showNextQuestion();
