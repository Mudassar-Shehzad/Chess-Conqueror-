let board = document.getElementById('board')
let currentPlayer = 'white'
let turn = document.getElementById('turn');
function createWhitePieceDiv(pieceUrl, pieceClass, pieceId) {
    return `
      <div class="piece white ${pieceId}" >
        <img src="${pieceUrl}" alt="${pieceClass}">
      </div>
    `;
}
function createBlackPieceDiv(pieceUrl, pieceClass, pieceId) {
    return `
      <div class="piece black ${pieceId}">
        <img src="${pieceUrl}" alt="${pieceClass}">
      </div>
    `;
}
const whiteKing = 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg';
const whiteQueen = 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg';
const whiteRook = 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg';
const whiteBishop = 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg';
const whiteKnight = 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg';
const whitePawn = 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg';
const blackKing = 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg';
const blackQueen = 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg';
const blackRook = 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg';
const blackBishop = 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg';
const blackKnight = 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg';
const blackPawn = 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg';


const whiteKingDiv = createWhitePieceDiv(whiteKing, 'white-king', 'whiteKing');
const whiteQueenDiv = createWhitePieceDiv(whiteQueen, 'white-queen', 'whiteQueen');
const whiteRookDiv = createWhitePieceDiv(whiteRook, 'white-rook', 'whiteRook');
const whiteBishopDiv = createWhitePieceDiv(whiteBishop, 'white-bishop', 'whiteBishop');
const whiteKnightDiv = createWhitePieceDiv(whiteKnight, 'white-knight', 'whiteKnight');
const whitePawnDiv = createWhitePieceDiv(whitePawn, 'white-pawn', 'whitePawn');

const blackKingDiv = createBlackPieceDiv(blackKing, 'black-king', 'blackKing');
const blackQueenDiv = createBlackPieceDiv(blackQueen, 'black-queen', 'blackQueen');
const blackRookDiv = createBlackPieceDiv(blackRook, 'black-rook', 'blackRook');
const blackBishopDiv = createBlackPieceDiv(blackBishop, 'black-bishop', 'blackBishop');
const blackKnightDiv = createBlackPieceDiv(blackKnight, 'black-knight', 'blackKnight');
const blackPawnDiv = createBlackPieceDiv(blackPawn, 'black-pawn', 'blackPawn');

const startPieces = [
    blackRookDiv, blackKnightDiv, blackBishopDiv, blackQueenDiv, blackKingDiv, blackBishopDiv, blackKnightDiv, blackRookDiv,
    blackPawnDiv, blackPawnDiv, blackPawnDiv, blackPawnDiv, blackPawnDiv, blackPawnDiv, blackPawnDiv, blackPawnDiv,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    whitePawnDiv, whitePawnDiv, whitePawnDiv, whitePawnDiv, whitePawnDiv, whitePawnDiv, whitePawnDiv, whitePawnDiv,
    whiteRookDiv, whiteKnightDiv, whiteBishopDiv, whiteQueenDiv, whiteKingDiv, whiteBishopDiv, whiteKnightDiv, whiteRookDiv,

]

let selectedPiece = null;
let selectedSquare = null;
let knightLegelMove = []

function setGame() {


    startPieces.forEach((piece, index) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = piece;
        if (square.firstChild) {
            square.setAttribute('draggable', true);
        }
        square.setAttribute('id', index)



        let row = Math.floor((63 - index) / 8) + 1
        if (row % 2 === 0) {
            square.style.backgroundColor = `${index % 2 === 0 ? 'gray' : 'white'}`
        } else {
            square.style.backgroundColor = `${index % 2 === 0 ? 'white' : 'gray'}`

        }

        board.append(square)

    })
    startPieces.forEach((piece, index) => {
        if (index <= 15) {
            const square = document.getElementById(index);
            if (square) {
                const pieceElement = square.firstChild;
                if (pieceElement && pieceElement.firstChild) {
                    pieceElement.firstChild.classList.add('gray');
                }
            }
        }
    });
    const squares = document.querySelectorAll('#board .square');

    squares.forEach(square => {
        square.addEventListener('click', (e) => {


            let closest = e.target.closest('.square')
            if (closest) {

                if (selectedSquare === closest) {
                    console.log('knightLegelMoves', knightLegelMove)
                    console.log('Deselecting piece');
                    unSelectPiece(closest);
                } else {
                    if (selectedPiece) {
                        console.log('Moving piece');
                        movePiece(closest);
                    } else {
                        console.log('Selecting piece');
                        selectPiece(closest);
                    }
                }
            }
            checkForWin()

        });
    });


}





function changePlayer() {
    currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
    turn.innerHTML = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s Turn`;
    // turn.style.color = currentPlayer
}

function selectPiece(square) {
    selectedPiece = square.querySelector('.piece');
    selectedSquare = square;

    // Only change the background color if there is a piece and it belongs to the current player
    if (selectedPiece) {
        square.style.backgroundColor = '#00e7ff5c'; // Highlight the selected piece's square
    }
}

function unSelectPiece(square) {
    // Reset the background color of the square
    let row = Math.floor((63 - square.id) / 8) + 1;
    square.style.backgroundColor = (row % 2 === 0) ?
        (square.id % 2 === 0 ? 'gray' : 'white') :
        (square.id % 2 === 0 ? 'white' : 'gray');

    // Clear the selected piece and square
    selectedPiece = null;
    selectedSquare = null;
}




function kingMovement(tSquareId, sPieceId) {
    if (
        tSquareId === sPieceId + 1 || tSquareId === sPieceId - 1 ||
        tSquareId === sPieceId + 8 || tSquareId === sPieceId - 8 ||
        tSquareId === sPieceId + 10 || tSquareId === sPieceId - 10 ||
        tSquareId === sPieceId + 7 || tSquareId === sPieceId - 7
    ) {
        return true
    }
    return false;
}
function knightMovement(tSquareId, sPieceId) {
    // console.log("Valid moves:", validMoves);
    let legelMoves = tSquareId === sPieceId + 17 || tSquareId === sPieceId - 17 || tSquareId === sPieceId + 6 || tSquareId === sPieceId - 6 || tSquareId === sPieceId + 10 || tSquareId === sPieceId - 10 || tSquareId === sPieceId + 15 || tSquareId === sPieceId - 15 ||
        console.log('slj')
    if (legelMoves) {
        return true
    }
    return false;

}
function bishopMovement(tSquareId, sPieceId) {
    const boardSize = 8;
    const directions = [-9, -7, 7, 9]; // Diagonal directions
    const currentRow = Math.floor(sPieceId / boardSize);
    const targetRow = Math.floor(tSquareId / boardSize);
    const currentCol = sPieceId % boardSize;
    const targetCol = tSquareId % boardSize;

    // Check if the move is strictly diagonal
    if (Math.abs(currentRow - targetRow) !== Math.abs(currentCol - targetCol)) {
        return false;
    }

    let direction;
    if (tSquareId > sPieceId) {
        if (targetCol > currentCol) direction = 9; // Down-right
        else direction = 7; // Down-left
    } else {
        if (targetCol > currentCol) direction = -7; // Up-right
        else direction = -9; // Up-left
    }

    let currentId = sPieceId + direction;
    while (currentId !== tSquareId) {
        // Check if the currentId is out of bounds
        if (currentId < 0 || currentId >= boardSize * boardSize) return false;

        // Check if there's any piece blocking the path
        if (document.getElementById(currentId).querySelector('.piece')) return false;

        currentId += direction;
    }

    return true;
}
function rookMovement(tSquareId, sPieceId) {
    if (
        tSquareId === sPieceId + 1 || tSquareId === sPieceId - 1 ||
        tSquareId === sPieceId + 2 || tSquareId === sPieceId - 2 ||
        tSquareId === sPieceId + 3 || tSquareId === sPieceId - 3 ||
        tSquareId === sPieceId + 4 || tSquareId === sPieceId - 4 ||
        tSquareId === sPieceId + 5 || tSquareId === sPieceId - 5 ||
        tSquareId === sPieceId + 6 || tSquareId === sPieceId - 6 ||
        tSquareId === sPieceId + 7 || tSquareId === sPieceId - 7 ||
        tSquareId === sPieceId + 8 || tSquareId === sPieceId - 8 ||
        tSquareId === sPieceId + 16 || tSquareId === sPieceId - 16 ||
        tSquareId === sPieceId + 24 || tSquareId === sPieceId - 24 ||
        tSquareId === sPieceId + 32 || tSquareId === sPieceId - 32 ||
        tSquareId === sPieceId + 40 || tSquareId === sPieceId - 40 ||
        tSquareId === sPieceId + 48 || tSquareId === sPieceId - 48
    ) {
        const direction = tSquareId > sPieceId ?
            ((tSquareId - sPieceId) % 8 === 0 ? 8 : 1) :
            ((sPieceId - tSquareId) % 8 === 0 ? -8 : -1);

        let currentId = sPieceId + direction;

        while (currentId !== tSquareId) {
            // Check if there's any piece blocking the path
            if (document.getElementById(currentId).querySelector('.piece')) {
                return false;
            }
            currentId += direction;
        }

        return true;
    }
    return false;
}
function queenMovement(tSquareId, sPieceId) {
    return bishopMovement(tSquareId, sPieceId) || rookMovement(tSquareId, sPieceId);
}
function checkForWin() {
    const whiteKing = document.querySelector('.whiteKing');
    const blackKing = document.querySelector('.blackKing');
    if (!whiteKing) {
        showCongratulations('Black')
    }
    if (!blackKing) {
        showCongratulations('white')
    }
}

function movePiece(targetSquare) {
    if (selectedPiece) {
        let targetPiece = targetSquare.querySelector('.piece');
        let selectedPieceId = parseInt(selectedPiece.closest('.square').getAttribute('id'));
        let targetSquareId = parseInt(targetSquare.getAttribute('id'));
        console.log(targetSquareId)

        //WhiteKing Movement

        if (selectedPiece.classList.contains('whiteKing') && currentPlayer == 'white') {
            if (kingMovement(targetSquareId, selectedPieceId)) {
                if (!targetPiece) {
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer()
                } else if (targetPiece.classList.contains('white')) {
                    targetSquare.innerHTML = '';
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer()
                }
            }
        }
        //Black King movement
        else if (selectedPiece.classList.contains('blackKing') && currentPlayer == 'black') {
            if (kingMovement(targetSquareId, selectedPieceId)) {
                if (!targetPiece) {
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer()
                } else if (targetPiece.classList.contains('white')) {
                    targetSquare.innerHTML = '';
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer()
                }
            }

        }
        //white Queen Movement
        else if (selectedPiece.classList.contains('whiteQueen') && currentPlayer == 'white') {
            if (queenMovement(targetSquareId, selectedPieceId)) {
                if (!targetPiece) {
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer()
                } else if (targetPiece.classList.contains('black')) {
                    targetSquare.innerHTML = '';
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer()
                }
            }

        }
        //black Queen Movement
        else if (selectedPiece.classList.contains('blackQueen') && currentPlayer == 'black') {
            if (queenMovement(targetSquareId, selectedPieceId)) {
                if (!targetPiece) {
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer()
                } else if (targetPiece.classList.contains('white')) {
                    targetSquare.innerHTML = '';
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer()
                }
            }
        }
        //white Rook Movement
        else if (selectedPiece.classList.contains('whiteRook') && currentPlayer == 'white') {
            if (rookMovement(targetSquareId, selectedPieceId)) {
                if (!targetPiece) {
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer()
                } else if (targetPiece.classList.contains('black')) {
                    targetSquare.innerHTML = '';
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer()
                }
            }
        }
        //black Rook Movement
        else if (selectedPiece.classList.contains('blackRook') && currentPlayer == 'black') {
            if (rookMovement(targetSquareId, selectedPieceId)) {
                if (!targetPiece) {
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer()
                } else if (targetPiece.classList.contains('white')) {
                    targetSquare.innerHTML = '';
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer()
                }
            }
        }
        //white Bishop Movement
        else if (selectedPiece.classList.contains('whiteBishop') && currentPlayer == 'white') {
            if (bishopMovement(targetSquareId, selectedPieceId)) {
                if (!targetPiece) {
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer()
                } else if (targetPiece.classList.contains('black')) {
                    targetSquare.innerHTML = '';
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer()
                }
            }
        }
        //Black Bishop Movement
        else if (selectedPiece.classList.contains('blackBishop') && currentPlayer == 'black') {
            if (bishopMovement(targetSquareId, selectedPieceId)) {
                if (!targetPiece) {
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer()
                } else if (targetPiece.classList.contains('white')) {
                    targetSquare.innerHTML = '';
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer()
                }
            }
        }
        //white Knight Movement
        else if (selectedPiece.classList.contains('whiteKnight') && currentPlayer == 'white') {

            if (!targetPiece) {
                if (knightMovement(targetSquareId, selectedPieceId)) {
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer()
                }
            } else if (targetPiece.classList.contains('black')) {
                if (knightMovement(targetSquareId, selectedPieceId)) {
                    targetSquare.innerHTML = '';
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer()
                }
            }

        }
        //black knight Movement
        else if (selectedPiece.classList.contains('blackKnight') && currentPlayer == 'black') {
            if (!targetPiece) {
                if (knightMovement(targetSquareId, selectedPieceId)) {
                    targetSquare.appendChild(selectedPiece);
                    selectedPiece = null;
                    unSelectPiece(selectedSquare);
                    changePlayer()
                }
            } else if (targetPiece.classList.contains('white')) {
                if (knightMovement(targetSquareId, selectedPieceId)) {
                    targetSquare.innerHTML = '';
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer()
                }
            }
        }
        // White Pawn movement
        else if (selectedPiece.classList.contains('whitePawn') && currentPlayer == 'white') {
            if (!targetPiece) {
                // Move forward one square
                if (targetSquareId === selectedPieceId - 8) {
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer();
                }
                // Move forward two squares from starting position
                else if (selectedPieceId >= 48 && selectedPieceId <= 55 && targetSquareId === selectedPieceId - 16) {
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer();
                }
            } else if (targetPiece.classList.contains('black')) {
                // Capture diagonally
                if (targetSquareId === selectedPieceId - 7 || targetSquareId === selectedPieceId - 9) {
                    targetSquare.innerHTML = '';
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer();
                }
            }
        }

        // Black Pawn movement
        else if (selectedPiece.classList.contains('blackPawn') && currentPlayer == 'black') {
            if (!targetPiece) {
                // Move forward one square
                if (targetSquareId === selectedPieceId + 8) {
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer();
                }
                // Move forward two squares from starting position
                else if (selectedPieceId >= 8 && selectedPieceId <= 15 && targetSquareId === selectedPieceId + 16) {
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer();
                }
            } else if (targetPiece.classList.contains('white')) {
                // Capture diagonally
                if (targetSquareId === selectedPieceId + 7 || targetSquareId === selectedPieceId + 9) {
                    targetSquare.innerHTML = '';
                    targetSquare.appendChild(selectedPiece);
                    unSelectPiece(selectedSquare);
                    changePlayer();
                }
            }
        }

        //Replacing white pieces to black pieces and so on. (If the selected piece is white and the target piece is black and so on)
        else if (currentPlayer == 'black' && targetPiece && (
            (targetPiece.classList.contains('white') && selectedPiece.classList.contains('black'))
        )) {
            targetPiece.style.backgroundColor = 'red'
            targetSquare.innerHTML = '';
            targetSquare.appendChild(selectedPiece);
            unSelectPiece(selectedSquare);
            changePlayer()

        }
        else if (currentPlayer == 'white' && targetPiece && (
            (targetPiece.classList.contains('black') && selectedPiece.classList.contains('white'))
        )) {
            targetSquare.innerHTML = '';
            targetSquare.appendChild(selectedPiece);
            unSelectPiece(selectedSquare);
            changePlayer()

        }
    }
}

function clearHighlight() {
    document.querySelectorAll('.square').forEach(square => {
        square.style.backgroundColor = (Math.floor(square.id / 8) + square.id % 8) % 2 === 0 ? 'white' : 'rgb(172, 129, 129)';
    });
}
setGame()
function resetBoard() {


    startPieces.forEach((piece, index) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = piece;
        if (square.firstChild) {
            square.setAttribute('draggable', true);
        }
        square.setAttribute('id', index)



        let row = Math.floor((63 - index) / 8) + 1
        if (row % 2 === 0) {
            square.style.backgroundColor = `${index % 2 === 0 ? 'gray' : 'white'}`
        } else {
            square.style.backgroundColor = `${index % 2 === 0 ? 'white' : 'gray'}`

        }

        board.append(square)

    })
    startPieces.forEach((piece, index) => {
        if (index <= 15) {
            const square = document.getElementById(index);
            if (square) {
                const pieceElement = square.firstChild;
                if (pieceElement && pieceElement.firstChild) {
                    pieceElement.firstChild.classList.add('gray');
                }
            }
        }
    });
    const squares = document.querySelectorAll('#board .square');

    squares.forEach(square => {
        square.addEventListener('click', (e) => {


            let closest = e.target.closest('.square')
            if (closest) {

                if (selectedSquare === closest) {
                    console.log('knightLegelMoves', knightLegelMove)
                    console.log('Deselecting piece');
                    unSelectPiece(closest);
                } else {
                    if (selectedPiece) {
                        console.log('Moving piece');
                        movePiece(closest);
                    } else {
                        console.log('Selecting piece');
                        selectPiece(closest);
                    }
                }
            }
            checkForWin()

        });
    });


}


function startNewGame() {
    board.innerHTML = '';
    currentPlayer = 'white'
    document.getElementById('turn').innerHTML = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s Turn`
    resetBoard();
}

document.getElementById('reset').addEventListener('click', startNewGame);



function showCongratulations(winner) {
    const congratsMessage = document.getElementById('congratsMessage');
    const winnerSpan = document.getElementById('winner');
    
    winnerSpan.textContent = winner;
    congratsMessage.classList.remove('hidden');
    congratsMessage.classList.add('visible');

    setTimeout(() => {
        congratsMessage.classList.remove('visible');
        setTimeout(() => {
            congratsMessage.classList.add('hidden');
            startNewGame();
        }, 500);
    }, 3000);
}