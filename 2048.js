var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function(){
    setgame();
}

function setgame(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    // board = [
    //     [2,2,2,2],
    //     [2,2,2,2],
    //     [4,4,8,8],
    //     [4,4,8,8]
    // ]

    for (let r=0; r<rows; r++){
        for(let c=0; c<columns; c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTitle(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
    setTwo();
}

function hasEmptyTile(){
    for(let r=0; r<rows; r++){
        for(let c=0; c<columns; c++){
            if(board[r][c] == 0){
                return true;
            }
        }
    }
    return false;
}

function hasPossibleMoves() {
    // Check if there are any adjacent tiles with the same value
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        if (board[r][c] === 0) {
          return true; // There is an empty tile, so there's a possible move.
        }
  
        // Check horizontally adjacent tiles
        if (c < columns - 1 && board[r][c] === board[r][c + 1]) {
          return true;
        }
  
        // Check vertically adjacent tiles
        if (r < rows - 1 && board[r][c] === board[r + 1][c]) {
          return true;
        }
      }
    }
  
    return false; // No possible moves left, the game is over.
  }

function setTwo(){
    if (!hasEmptyTile() || !hasPossibleMoves()) {
        // No empty tiles or no possible moves left, game over.
        showGameOver();
        return;
    }

    let found = false;
    while(!found){
        // rendom r, c
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if(board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function showGameOver(){
    let finalScore = document.getElementById("final-score");
    finalScore.innerText = score;
    let gameOverScreen = document.getElementById("game-over");
    gameOverScreen.style.display = "block";
}

function restartGame() {
    score = 0;
    let gameOverScreen = document.getElementById("game-over");
    gameOverScreen.style.display = "none";

    // Clear the board
    let boardElement = document.getElementById("board");
    while (boardElement.firstChild) {
        boardElement.removeChild(boardElement.firstChild);
    }

    setgame();
}

function updateTitle(tile, num){
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if(num>0){
        tile.innerText = num;
        if(num<=4096){
            tile.classList.add("x" + num.toString());
        }
        else{
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener("keyup", (e) => {
    if(e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;

    // Check for game over after each move
    if (!hasPossibleMoves()) {
        showGameOver();
        return;
    }

});

// Handle restart button click
document.getElementById("restart-button").addEventListener("click", restartGame); 

function filterZero(row){
    return row.filter(num => num != 0); //create a new array without zeros
}

function slide(row){
    //[0, 2, 2, 2]
    row = filterZero(row); //get rid of zeros -> [2, 2, 2]

    //slide
    for(let i=0; i<row.length-1; i++){
        if(row[i] == row[i+1]){
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        } // [2, 2, 2] -> [4, 0, 2]
    }

    row = filterZero(row); //get rid of zeros -> [4, 2]

    //add zeros
    while(row.length < columns){
        row.push(0);
    } // [4, 2] -> [4, 2, 0, 0]

    return row;
}

function slideLeft(){
    for(let r=0; r<rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for(let c=0; c<columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTitle(tile, num);
        }
    }
}

function slideRight(){
    for(let r=0; r<rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for(let c=0; c<columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTitle(tile, num);
        }
    }
}

function slideUp(){
    for(let c=0; c<columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for(let r=0; r<rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTitle(tile, num);
        }
    }
}

function slideDown(){
    for(let c=0; c<columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for(let r=0; r<rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTitle(tile, num);
        }
    }
}

