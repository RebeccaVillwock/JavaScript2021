// global variables
var player1 = '<span class="player1"></span>';
var player2 = '<span class="player2"></span>';
var currentPlayer = player1;
var player1score = 0;
var player2score = 0;
var board;
var moves;

function createBoard(){
    board = [
        //0, 1, 2, 3 col
        [0, 0, 0, 0, 0, 0, 0], // 0
        [0, 0, 0, 0, 0, 0, 0], // 1 row
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ];

    //board[row][col]

    let html = '<table>';

    // table head
    html += '<thead>';
    html += '<tr class="buttons">';
    for(let col = 0; col < board[0].length; col++){
        html += '<td><button class="dropBtn" data-col="' + col + '">&darr;</button></td>';
    }
    html += '</tr>';
    html += '</thead>';

    // table body
    html += '<tbody>';

    for(let row in board){
        // board[row] will give us the entire row
        html += '<tr>';
        for(let col = 0; col < board[row].length; col++){
            html += '<td><span class="space"></span></td>';
        }


        html += '</tr>';
    }

    html += '</tbody>';

    html += '</table>';

    // output table to page
    $('#board').html(html);

    $('.dropBtn').on('click', drop);
}

function newGame(){
    currentPlayer = player1;
    $('#winner').empty();
    createBoard();
}


function drop(e){
    //console.log(e);
    //let col = e.target.id;
    //let col = this.id;
    // "this" refers to the object (element) that calls the function
    //let col = $(this).attr('data-col');
    let col = $(this).data('col'); // specific to jquery


    // find the lowest row open for this column
    for(let row = board.length - 1; row >= 0; row--){
        // check if open
        if(board[row][col] === 0){
            // it's open
            board[row][col] = currentPlayer;

            // update table in dom
            putPiece(row, col);

            check4win(row, col);

            switchPlayer();

            // check if col is full
            if(row === 0){
                $(this).attr('disabled', 'disabled');
            }

            // exit the loop
            break;
        }
    }


}

function putPiece(row, col){
    let delayMs = 50;
    for(let i = 0; i <= row; i++) {
        $('#board table tbody tr:eq(' + i + ') td:eq(' + col + ') .space')
            .html(currentPlayer)
            .find('span')
            .fadeOut(0)
            .delay(delayMs * i)
            .fadeIn(0)
            .delay(delayMs)
            .fadeOut(0);

        // show if final destination
        if(row === i){
            $('#board table tbody tr:eq(' + i + ') td:eq(' + col + ') .space span')
                .fadeIn(0);
        }
    }


}


function switchPlayer(){
    // ternary
    // result     =    condition             ? true value : false value;
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    $('#currentPlayer').html(currentPlayer);
    $('.dropBtn').toggleClass('player2');
}


function check4win(row, col){
    // check for horizontal win
    //for(let row = 0; row < board.length; row++){
          for(let col = 0; col < board[row].length - 3; col++){
                if(board[row][col] === currentPlayer
                && board[row][col+1] === currentPlayer
                && board[row][col+2] === currentPlayer
                && board[row][col+3] === currentPlayer
                ){
                    endGame();
                    return;
                }
          }
    //}

    // check for vertical win
    for(let row = 0; row < board.length - 3; row++){
        //for(let col = 0; col < board[row].length - 3; col++){
            if(board[row][col] === currentPlayer
                && board[row+1][col] === currentPlayer
                && board[row+2][col] === currentPlayer
                && board[row+3][col] === currentPlayer
            ){
                endGame();
                return;
            }
        //}
    }

    // check for downward diagonal
    for(let row = 0; row < board.length - 3; row++){
        for(let col = 0; col < board[row].length - 3; col++){
            if(board[row][col] === currentPlayer
                && board[row+1][col+1] === currentPlayer
                && board[row+2][col+2] === currentPlayer
                && board[row+3][col+3] === currentPlayer
            ){
                endGame();
                return;
            }
        }
    }

    // check for upward diagonal
    for(let row = 3; row < board.length; row++){
        for(let col = 0; col < board[row].length - 3; col++){
            if(board[row][col] === currentPlayer
                && board[row-1][col+1] === currentPlayer
                && board[row-2][col+2] === currentPlayer
                && board[row-3][col+3] === currentPlayer
            ){
                endGame();
                return;
            }
        }
    }


}

function endGame(){
    $('#winner').html(currentPlayer + ' wins!');
    $('.dropBtn').attr('disabled', 'disabled');

}

// when the page loads
$(document).ready(function(){
    createBoard();
    $('#newGame').on('click', newGame);

});
