let board = [];
let rows = 8;
let columns = 8;
const FLAG_COUNTER = 10;
const TIME_COUNTER = 0;
const MINES_COUNT = 10;

window.onload = function() {
    generateMockData();
    createDefaultBoard();
}

function generateMockData(){
    let url = window.location.search.split("?");        //split--> generates an array and everything that is before the "?" is in position 1
    if (window.location.search.includes("?")) {
        let urlWithHyphen = url[1].split("-");          //we get the url previously saved and then we get the first position of the array and we split it with -
        columns = urlWithHyphen[0].length;
        rows = urlWithHyphen.length;
        console.log(columns, rows);
        generateMockDataBoard(columns, rows);
    }
}

function generateMockDataBoard(numRows, numCols){       //dynamic mockData
    let boardWidth = numRows * 50;
    let boardHeight = numCols * 50;

    document.getElementById("board").style.width = boardWidth + "px";
    document.getElementById("board").style.height = boardHeight + "px";
}

function createDefaultBoard() {
    document.getElementById("flag-count").innerText = FLAG_COUNTER;  //set the html mine count to the constant we created in the js
    document.getElementById("time-count").innerText = TIME_COUNTER;
    //creation of default board
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cell = document.createElement("div");                //create divs
            cell.id = r.toString() + "-" + c.toString();             //ad id's to the divs
            document.getElementById("board").append(cell);
            row.push(cell);
        }
        board.push(row);
    }
}