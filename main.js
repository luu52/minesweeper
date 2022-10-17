let board = [];
let rows = 8;
let columns = 8;
let minesLocation = [];                                                                             // for example = "2-2", "3-4", "2-1"
let cellsClicked = 0;                                                                               //everytime we click on a cell this goes up
let flagEnabled = false;                                                                            //whenever we click on the flag, it changes to true or false
let uncertaintySymbol = false;
let gameOver = false;                                                                               //disable buttons when game is over
let flag_counter = 10;
let number_mines = 10;
let interval;
let counterIsRunning = false;

window.onload = function () {
  generateMockData();
  startGame();
};

function generateMockData() {
  let url = window.location.search.split("?");                                                     //split--> generates an array and everything that is before the "?" is in position 1
  if (window.location.search.includes("?")) {
    let urlWithHyphen = url[1].split("-");                                                         //we get the url previously saved and then we get the first position of the array and we split it with -
    columns = urlWithHyphen[0].length;
    rows = urlWithHyphen.length;
    console.log(columns, rows);
    generateMockDataBoard(columns, rows);
  }
  console.log(board);
}

function generateMockDataBoard(numRows, numCols) {                                                  //dynamic mockData
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
        minesLocation = r.toString() + "-" + c.toString();
      }
    }
  }
}

function startGame() {
  document.getElementById("flag-count").innerText = flag_counter;                                           //with this we are saying that the HTML flag-count id equals the flag_counter variable created in the js
  document.getElementById("flag-button").addEventListener("click", setFlag);
  document.getElementById("uncertain-button").addEventListener("click", setUncertaintySymbol);
  document.getElementById("reset-game").addEventListener("click", resetGame);

  if (window.location.search.includes("?")) {
    placeMinesInMockData();
  } else{
    placeRandomMines();
  }

  //creation of default board
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let cell = document.createElement("div");
      cell.id = r.toString() + "-" + c.toString();                                                          //ad id's to the divs
      cell.addEventListener("click", clickcell);                                                            //make the cells clickeable
      document.getElementById("board").append(cell);
      cell.setAttribute("data-testid", r + "-" + c);
      row.push(cell);
    }
    board.push(row);
  }
}

function placeRandomMines() {
  let minesLeft = number_mines;
  while (minesLeft > 0) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    let id = r.toString() + "-" + c.toString();

    if (!minesLocation.includes(id)) {
      minesLocation.push(id);
      minesLeft -= 1;
    }
  }
  console.log(minesLocation);
}

function setFlag() {                                                                                        //function to change the background color of the flag button depending if we click it or not
  if (flagEnabled) {
    flagEnabled = false;
    document.getElementById("flag-button").style.backgroundColor = "#F5EFE6";
  } else {
    flagEnabled = true;
    document.getElementById("flag-button").style.backgroundColor = "darkgray";
  }
}

function setUncertaintySymbol() {                                                                           //function to change the background color of the uncertainty button depending if we click it or not
  if (uncertaintySymbol) {
    uncertaintySymbol = false;
    document.getElementById("uncertain-button").style.backgroundColor = "#F5EFE6";
  } else {
    uncertaintySymbol = true;
    document.getElementById("uncertain-button").style.backgroundColor = "darkgray";
  }
}

function clickcell() {
  if (!counterIsRunning) {
    counterIsRunning = true;
    timeCounter();
  }

  if (gameOver || this.classList.contains("cell-clicked")) {
    return;
  }

  let cell = this;
  if (flagEnabled) {
    if (cell.innerText == "") {                                                                             //if the clicked cell has nothing, and we click it, we set a flag
      cell.innerText = "🚩";
      --flag_counter
    } else if (cell.innerText == "🚩") {                                                                    //if the clicked cell has a flag, and we click it, we set it to nothing
      cell.innerText = "";
      ++flag_counter
    }
    return;
  }

  if (uncertaintySymbol) {
    if (cell.innerText == "🚩") {                                                                           //if the clicked cell has a flag symbol, and we click it, we set a question mark
      cell.innerText = "❓";
    } else if (cell.innerText == "❓") {                                                                    //if the clicked cell has a question mark, and we click it, we set it to nothing
      cell.innerText = "";
    }
    return;
  }

  if (minesLocation.includes(cell.id)) {
    gameOver = true;
    revealAllMinesWhenOneIsClicked();
    return;
  }

  let coords = cell.id.split("-");                                                                          // "0-0" -> ["0", "0"]
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);
  checkMine(r, c);
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
}

function checkMine(r, c) {
  if (r < 0 || r >= rows || c < 0 || c >= columns) {    //check that everything is inside the board
    return;
  }
  if (board[r][c].classList.contains("cell-clicked")) {
    return;
  }

  board[r][c].classList.add("cell-clicked");
  cellsClicked += 1;

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
  } else {
    //top 3
    checkMine(r - 1, c - 1); //top left
    checkMine(r - 1, c); //top
    checkMine(r - 1, c + 1); //top right

    //left and right
    checkMine(r, c - 1); //left
    checkMine(r, c + 1); //right

    //bottom 3
    checkMine(r + 1, c - 1); //bottom left
    checkMine(r + 1, c); //bottom
    checkMine(r + 1, c + 1); //bottom right
  }

  if (cellsClicked == rows * columns - number_mines) {
    document.getElementById("mines-count").innerText = "Cleared";
    gameOver = true;
    window.alert("YOU WON");
  }
}

function checkcell(r, c) {
  if (r < 0 || r >= rows || c < 0 || c >= columns) {
    return 0;
  }
  if (minesLocation.includes(r.toString() + "-" + c.toString())) {
    return 1;
  }
  return 0;
}

function resetGame(){

}

function timeCounter(){
  let seconds = 0;
  interval = window.setInterval(function(){
    if (counterIsRunning) {
      document.getElementById("time-count").innerHTML = seconds.toString();
      seconds++
    }
  },1000)
}
