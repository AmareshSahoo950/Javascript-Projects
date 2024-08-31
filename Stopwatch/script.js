let timerInterval;
let seconds = 0;

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

startButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTime, 1000);
});

stopButton.addEventListener("click", () => {
  clearInterval(timerInterval);

  if (seconds > 0) startButton.innerHTML = "continue";
});

resetButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  startButton.innerHTML = "start";
  seconds = 0;
  display.textContent = "00:00:00";
});

function updateTime() {
  seconds++;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  display.textContent =
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(secs).padStart(2, "0");
}
