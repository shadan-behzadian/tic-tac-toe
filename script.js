var origBoard;
const huPlayer = "O";
const aiPlayer = "X";
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const cells = document.querySelectorAll(".cell");
const restart = document.querySelector(".restart");
console.log(cells);
startGame();

function startGame() {
  document.querySelector(".endgame").style.display = "none";
  origBoard = Array.from(Array(9).keys());
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", turnClick, false);
  }
}

function turnClick(squar) {
  //console.log(squar.target.id)
  if (typeof origBoard[squar.target.id] == "number") {
    turn(squar.target.id, huPlayer);
    if (!checkTie() && !checkWin(origBoard, huPlayer)) {
      setTimeout(function () {
        turn(bestSpot(), aiPlayer);
      }, 1000);
    } else checkWin(origBoard, huPlayer);
  }
}

function turn(squarId, player) {
  origBoard[squarId] = player;
  console.log(origBoard[squarId]);
  console.log((origBoard[squarId] = player));
  document.getElementById(squarId).innerText = player;
  let gameWon = checkWin(origBoard, player);
  if (gameWon) {
    gameOver(gameWon);
  }
}

//checks empthy squars for computer turn
function emptySquars() {
  return origBoard.filter((s) => typeof s == "number");
}

function bestSpot() {
  return emptySquars()[0];
}

function checkWin(board, player) {
  //console.log(board);
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  console.log(plays);
  let gameWon = null;
  //console.log(winCombos.entries);
  for (let [index, win] of winCombos.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}

function checkTie() {
  if (emptySquars().length == 0) {
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "rgb(108, 206, 173)";
      cells[i].removeEventListener("click", turnClick, false);
    }
    declareWinner("Tie Game");
    return true;
  }
  return false;
}

function gameOver(gameWon) {
  //console.log("gameover");

  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player == huPlayer ? "pink" : "rgb(119, 44, 44)";
  }

  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", turnClick, false);
  }
  declareWinner(gameWon.player == huPlayer ? "You Win!🎉" : "You Lose 💩");
}

function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
  restart.style.display = "block";
}
