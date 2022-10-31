let board = [];
let rows = 8;
let columns = 8;
let minesLocation = []; // for example = "2-2", "3-4", "2-1"
let cellsClicked = 0; //everytime we click on a cell this goes up
let gameOver = false; //disable buttons when game is over
let flag_counter = 0;
let number_mines = 10;
let interval;
let counterIsRunning = false;
let gameOverText = "GAME OVER";
let youWonText = "YOU WON";

window.onload = function () {
  generateMockData();
  startGame();
  resetGame();
};

function generateMockData() {
  let url = window.location.search.split("?"); //split--> generates an array and everything that is before the "?" is in position 1
  if (window.location.search.includes("?")) {
    let urlWithHyphen = url[1].split("-"); //we get the url previously saved and then we get the first position of the array and we split it with -
    columns = urlWithHyphen[0].length;
    rows = urlWithHyphen.length;
    generateMockDataBoard(columns, rows);
  }
  console.log(board);
}

function generateMockDataBoard(numRows, numCols) { //dynamic mockData
  let boardWidth = numRows * 50;
  let boardHeight = numCols * 50;

  document.getElementById("board").style.width = boardWidth + "px";
  document.getElementById("board").style.height = boardHeight + "px";
}

function placeMinesInMockData() {
  let url = window.location.search.split("?");
  let MockData = url[1].split("-");
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (MockData[r].charAt(c) == "*") {
        minesLocation.push(r.toString() + "-" + c.toString());
        flag_counter++;
      }
    }
  }
  console.log(minesLocation);
}

function startGame() {
  if (window.location.search.includes("?")) {
    placeMinesInMockData();
  } else {
    placeRandomMines();
  }

  document.getElementById("flag-count").innerText = flag_counter; //with this we are saying that the HTML flag-count id equals the flag_counter variable created in the js

  //creation of default board
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let cell = document.createElement("div");
      cell.id = r.toString() + "-" + c.toString(); //ad id's to the divs
      cell.addEventListener("click", (event) => {
        clickcell(event.target);
      }); //make the cells clickeable
      cell.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        tagCell(event.target);
      });
      document.getElementById("board").append(cell);
      cell.setAttribute("data-testid", r + "-" + c);
      row.push(cell);
    }
    board.push(row);
  }
}

function placeRandomMines() {
  flag_counter = number_mines;
  while (number_mines > 0) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    let id = r.toString() + "-" + c.toString();

    if (!minesLocation.includes(id)) {
      minesLocation.push(id);
      number_mines -= 1;
    }
  }
  console.log(minesLocation);
}

function tagCell(cell) {
  console.log(cell);
  if (cell.innerText == "") {
    //if the clicked cell has nothing, and we click it, we set a flag
    cell.innerText = "🚩";
    flag_counter--;
  } else if (cell.innerText == "🚩") {
    //if the clicked cell has a flag, and we click it, we set it to nothing
    cell.innerText = "❓";
    flag_counter++;
  } else if (cell.innerText == "❓") {
    cell.innerText = "";
  } else {
    cell.innerText = "";
  }
  document.getElementById("flag-count").innerText = flag_counter;
}

function clickcell(cell) {
  if (!counterIsRunning) {
    counterIsRunning = true;
    timeCounter();
  }

  if (gameOver || cell.classList.contains("cell-clicked")) {
    return;
  }

  if (minesLocation.includes(cell.id)) {
    gameOver = true;
    revealAllMinesWhenOneIsClicked();
    return;
  }

  let coords = cell.id.split("-"); // "0-0" -> ["0", "0"]
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);
  checkMine(r, c);

  cell.classList.add("disabledCells");
}

function revealAllMinesWhenOneIsClicked() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let cell = board[r][c];
      if (minesLocation.includes(cell.id)) {
        cell.innerText = "💣";
        cell.classList.add("minedCellBackgroundColor");
      }
    }
  }
  clearInterval(interval);
  document.getElementById("game-over").innerText = gameOverText;
  disableAllCells();
}

function checkMine(r, c) {
  if (board[r][c].classList.contains("cell-clicked")) {
    return;
  }
  board[r][c].classList.add("disabledCells");
  board[r][c].classList.add("cell-clicked");
  cellsClicked += 1;
  checkIfGameIsWon();

  let minesFound = 0;

  //top 3
  minesFound += checkcell(r - 1, c - 1); //top left
  minesFound += checkcell(r - 1, c); //top
  minesFound += checkcell(r - 1, c + 1); //top right

  //left and right
  minesFound += checkcell(r, c - 1); //left
  minesFound += checkcell(r, c + 1); //right

  //bottom 3
  minesFound += checkcell(r + 1, c - 1); //bottom left
  minesFound += checkcell(r + 1, c); //bottom
  minesFound += checkcell(r + 1, c + 1); //bottom right

  if (minesFound > 0) {
    board[r][c].innerText = minesFound;
    board[r][c].classList.add("x" + minesFound.toString()); //depending on the mines found, it gets a different class x1,x2,x3...
  }
}

function checkcell(r, c) {
  if (minesLocation.includes(r.toString() + "-" + c.toString())) {
    return 1;
  }
  return 0;
}

function timeCounter() {
  let seconds = 0;
  interval = window.setInterval(function () {
    if (counterIsRunning) {
      document.getElementById("time-count").innerHTML = seconds.toString();
      seconds++;
    }
  }, 1000);
}

function checkIfGameIsWon() {
  if (rows * columns - minesLocation.length == cellsClicked) {
    document.getElementById("win-message").innerText = youWonText;
    disableAllCells();
    clearInterval(interval);
    gameOver = true;
  }
}

function disableAllCells() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      document.getElementById(r + "-" + c).classList.add("disabledCells");
    }
  }
}

function reset_minesweeper() {
  seconds = 0;
  document.getElementById("time-count").innerHTML = seconds;
  document.getElementById("game-over").innerText = "";
  document.getElementById("win-message").innerText = "";

  gameOver = false;
  counterIsRunning = false;
  flag_counter = 0;
  number_mines = 10;
  clearInterval(interval);
  minesLocation = [];
  board = [];
  cellsClicked = 0;
  deleteBoard();
  generateMockData();
  startGame();
}

function deleteBoard() {
  for (let i = 0; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      document.getElementById(i + "-" + j).remove();
    }
  }
}

function resetGame() {
  document.getElementById("reset-game").addEventListener("click", (event) => {
    {
      reset_minesweeper(event.target);
    }
  });
}
