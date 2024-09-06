let score = JSON.parse(localStorage.getItem("resultValues")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

//function autoplay()
//{
// if(!isAutoPlaying){
//    intervalId = setInterval(function(){
//     const playerMove = pickComputerMove()
//     playGame(playerMove)
//   },1000)
//   isAutoPlaying = true ;
// }
// else{
//   clearInterval(intervalId)
//   isAutoPlaying =false
// }
//
//}

// We will use arrow Function in this case .
//const autoplay() => {

// }
const autoplay = () => {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
};

let rockClick = document.querySelector(".js-rock-button");
rockClick.addEventListener("click", () => {
  playGame("Rock");
});

document
  .querySelector(".js-paper-button")
  .addEventListener("click", () => playGame("Paper"));

document
  .querySelector(".js-scissors-button")
  .addEventListener("click", () => playGame("Scissors"));

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") playGame("Rock");
  else if (event.key === "p") playGame("Paper");
  else if (event.key === "s") playGame("Scissors");
  else if (event.key === "Backspace") showResetConfirmation();
  else if (event.key === "a" || event.key === " ") autoplay();
  console.log(event.key);
  if (document.querySelector(".js-reset-message").innerHTML != "") {
    if (event.key === "y") {
      resetScore();
      hideResetConfirmation();
    } else if (event.key === "n" || event.key === "Escape")
      hideResetConfirmation();
  }
});

function playGame(playerMove) {
  const ComputerMove = pickComputerMove();
  let result = "";

  if (playerMove === "Scissors") {
    if (ComputerMove === "Rock") result = "You Lose";
    else if (ComputerMove === "Paper") result = "You Win";
    else if (ComputerMove === "Scissors") result = "Tie";
  } else if (playerMove === "Paper") {
    if (ComputerMove === "Rock") result = "You Win";
    else if (ComputerMove === "Paper") result = "Tie";
    else if (ComputerMove === "Scissors") result = "You Lose";
  } else if (playerMove === "Rock") {
    if (ComputerMove === "Rock") result = "Tie";
    else if (ComputerMove === "Paper") result = "You Lose";
    else if (ComputerMove === "Scissors") result = "You Win";
  }

  if (result === "You Win") score.wins++;
  else if (result === "You Lose") score.losses++;
  else if (result === "Tie") score.ties++;

  localStorage.setItem("resultValues", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon"> <img src="images/${ComputerMove}-emoji.png" class="move-icon"> computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let ComputerMove = "";

  if (randomNumber > 0 && randomNumber <= 1 / 3) ComputerMove = "Rock";
  else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3)
    ComputerMove = "Paper";
  else ComputerMove = "Scissors";
  return ComputerMove;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("resultValues");
  updateScoreElement();
}

document
  .querySelector(".js-reset-score-button")
  .addEventListener("click", () => showResetConfirmation());

document
  .querySelector(".js-auto-play-button")
  .addEventListener("click", () => autoplay());

function showResetConfirmation() {
  document.querySelector(
    ".js-reset-message"
  ).innerHTML = `<p class="confirmation">Are you sure you want to reset the score ? </p> 
    <button class="js-reset-yes">
      Yes
    </button>
    <button class="js-reset-no">
      No
    </button>`;

  //for clicking yes
  document.querySelector(".js-reset-yes").addEventListener("click", () => {
    resetScore();
    hideResetConfirmation();
  });

  //for clicking no
  document
    .querySelector(".js-reset-no")
    .addEventListener("click", () => hideResetConfirmation());
}

function hideResetConfirmation() {
  document.querySelector(".js-reset-message").innerHTML = "";
}
