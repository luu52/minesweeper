let board = [];
let rows = 8;
let columns = 8;
const MINES_COUNTER = 10;

window.onload = function() {
  createDefaultBoard();
}

function createDefaultBoard() {
    document.getElementById("mines-count").innerText = MINES_COUNTER;  //set the html mine count to the constant we created in the js
    //creation of default board
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cell = document.createElement("div");
            cell.id = r.toString() + "-" + c.toString();            //ad id's to the divs
            document.getElementById("board").append(cell);
            row.push(cell);
        }
        board.push(row);
    }
}