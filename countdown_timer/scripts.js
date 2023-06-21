// 타이머 상태를 나타내는 변수
let timerInterval;
let isTimerRunning = false;

// 입력 필드, 타이머 및 버튼 요소 가져오기
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start-btn');
const stopButton = document.getElementById('stop-btn');
const resetButton = document.getElementById('reset-btn');

// Start 버튼 클릭 시
startButton.addEventListener('click', () => {
  // 입력 필드 숨기기
  document.getElementById('input-section').style.display = 'none';
  // 타이머 시작
  startTimer();
});

// Stop 버튼 클릭 시
stopButton.addEventListener('click', () => {
  // 타이머 정지
  stopTimer();
});

// Reset 버튼 클릭 시
resetButton.addEventListener('click', () => {
  // 모든 입력 필드 초기화
  hoursInput.value = 0;
  minutesInput.value = 0;
  secondsInput.value = 0;
  // 입력 필드 표시
  document.getElementById('input-section').style.display = 'block';
  // 타이머 초기화
  resetTimer();
});

// 타이머 시작 함수
function startTimer() {
  if (!isTimerRunning) {
    const hours = parseInt(hoursInput.value);
    const minutes = parseInt(minutesInput.value);
    const seconds = parseInt(secondsInput.value);

    // 입력된 시간 계산
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // 각 시간 단위 계산
    let displayedHours = Math.floor(totalSeconds / 3600);
    let displayedMinutes = Math.floor((totalSeconds % 3600) / 60);
    let displayedSeconds = totalSeconds % 60;

    // 타이머 표시 업데이트
    updateTimer(displayedHours, displayedMinutes, displayedSeconds);

    // 1초마다 타이머 업데이트
    timerInterval = setInterval(() => {
      totalSeconds--;

      displayedHours = Math.floor(totalSeconds / 3600);
      displayedMinutes = Math.floor((totalSeconds % 3600) / 60);
      displayedSeconds = totalSeconds % 60;

      // 타이머 표시 업데이트
      updateTimer(displayedHours, displayedMinutes, displayedSeconds);

      // 타이머가 0이 되면 정지하고 알림 표시
      if (totalSeconds === 0) {
        stopTimer();
        showNotification();
      }
    }, 1000);

    isTimerRunning = true;
  }
}

// 타이머 정지 함수
function stopTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
}

// 타이머 초기화 함수
function resetTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  updateTimer(0, 0, 0);
}

// 타이머 표시 업데이트 함수
function updateTimer(hours, minutes, seconds) {
  timerElement.textContent = `${padZero(hours)} : ${padZero(minutes)} : ${padZero(seconds)}`;
}

// 숫자를 두 자리로 패딩하는 함수
function padZero(number) {
  return number.toString().padStart(2, '0');
}

// 알림 표시 함수
function showNotification() {
  // 알림 지원 여부 확인
  if ('Notification' in window && Notification.permission === 'granted') {
    // 알림 생성
    const notification = new Notification('타이머 종료', {
      body: '지정된 시간이 종료되었습니다.',
      icon: 'notification-icon.png'
    });

    // 알림 클릭 시 해당 창으로 포커스
    notification.onclick = function () {
      window.focus();
    };
  }
}
