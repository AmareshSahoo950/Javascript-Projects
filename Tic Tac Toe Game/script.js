const winningFormations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const playerX = "X";
const playerO = "O";

const squares = document.querySelectorAll(".square");
let currentPlayer = playerX;
let previousPlayer = currentPlayer;

let playerXinputs = [];
let playerOinputs = [];

let moveCount = 0;
let result = "";

const winTitle = document.querySelector(".title .winner-title");
const title = document.querySelector(".js-title");

//Title-setter
function updatetitle(value) {
  return `<div class="title js-title">
  Player
  <strong style="color: rgb(24, 201, 255)">${value}</strong>'s
  turn
  </div>`;
}

//winner-title-setter
function winnerTitle(value) {
  return `<div class="title js-title winner-title">${value}</div>`;
}

gamePlay();

//Game-Play
function gamePlay() {
  title.innerHTML = updatetitle(currentPlayer);

  squares.forEach((square) => {
    square.addEventListener("click", () => {
      let currentBoxNum = square.getAttribute("id");
      const textNode = document.createTextNode(currentPlayer);
      let currentBox = document.getElementById(currentBoxNum);

      if (currentBox.textContent === "") {
        currentBox.appendChild(textNode);
        moveCount++;
        checkWin(currentPlayer, currentBoxNum);

        if (previousPlayer === playerX) {
          currentPlayer = playerO;
          if (result === "") title.innerHTML = updatetitle(currentPlayer);
        } else {
          currentPlayer = playerX;
          if (result === "") title.innerHTML = updatetitle(currentPlayer);
        }

        previousPlayer = currentPlayer;
      }
    });
  });
}

//Check-win
function checkWin(currentPlayer, currentBoxNum) {
  if (currentPlayer === playerO) playerOinputs.push(currentBoxNum);
  else playerXinputs.push(currentBoxNum);
  let winner;
  arraysEqual(winningFormations, playerOinputs, playerXinputs);
  winner = result;

  console.log(winner);

  if (winner !== "") printResult(winner);
  else {
    if (moveCount === 9 && winner === "") {
      result = "It's a Draw!!";
      printResult(result);
    }
  }
}

//Arrays-Equal
function arraysEqual(winningFormations, playerOinputs, playerXinputs) {
  const playerOvalues = new Set(
    Array.from(playerOinputs, (number) => Number(number))
  );

  const playerXvalues = new Set(
    Array.from(playerXinputs, (number) => Number(number))
  );

  if (playerXvalues.size >= 3 || playerOvalues.size >= 3) {
    winningFormations.forEach((element) => {
      let formation = new Set(element);

      // console.log(
      //   "playerOvalues : ",
      //   playerOvalues,
      //   " ",
      //   "playerXValues : ",
      //   playerXvalues,
      //   " ",
      //   "formations : ",
      //   formation
      // );

      if ([...formation].every((value) => playerXvalues.has(value))) {
        result = "X wins !!";
      } else if ([...formation].every((value) => playerOvalues.has(value))) {
        result = "O wins !!";
      }
    });
  }
}

//Print-Result
function printResult(result) {
  title.innerHTML = winnerTitle(result);
  console.log(title.innerHTML);
}

//Reset
const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", () => {
  squares.forEach((square) => {
    square.innerHTML = "";
  });

  currentPlayer = playerX;
  previousPlayer = currentPlayer;
  playerXinputs = [];
  playerOinputs = [];
  result = "";
  moveCount = 0;
  gamePlay();
});

//Ligt-Dark-mode
const lightmode = document.querySelector(".light-mode");
const button = document.querySelector(".light-button");

let lightswitch = localStorage.getItem("light") || "ON";

button.addEventListener("click", () => {
  if (lightswitch === "ON") {
    button.innerHTML =
      '<i class="fa-solid fa-toggle-on"></i> <div class="tooltip-text">Turn on Dark mode</div>';
    lightmode.classList.add("dark-mode");
    lightswitch = "OFF";
    localStorage.setItem("light", "OFF");
  } else if (lightswitch === "OFF") {
    lightmode.classList.remove("dark-mode");
    button.innerHTML =
      '<i class="fa-solid fa-toggle-off"></i> <div class="tooltip-text">Turn on Dark mode</div>';
    lightswitch = "ON";
    localStorage.setItem("light", "ON");
  }
});
