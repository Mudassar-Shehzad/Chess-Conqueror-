
// function dragOver(e) {
//     e.preventDefault()
// }




// let draggedP_Id;
// let draggedElement;

// function dragStart(e) {
//     const squareDiv = e.currentTarget;
//     let squareId = squareDiv.getAttribute('squareid')
//     let parse = parseFloat(squareId)
//     console.log(parse)
//     console.log(parse + 1)
//     console.log(parse + 2)


//     const image = squareDiv.querySelector('.piece');
//     if (image) {
//         draggedElement = image;
//     }

// }

// function dragDrop(e) {
//     e.stopPropagation();
//     if (!e.target.querySelector('img')) {
//         e.target.append(draggedElement)
//     }
// }


// const WHITE_KING = 'fas fa-chess-king';
// const WHITE_QUEEN = 'fas fa-chess-queen';
// const WHITE_ROOK = 'fas fa-chess-rook';
// const WHITE_BISHOP = 'fas fa-chess-bishop';
// const WHITE_KNIGHT = 'fas fa-chess-knight';
// const WHITE_PAWN = 'fas fa-chess-pawn';

// const BLACK_KING = 'fas fa-chess-king';
// const BLACK_QUEEN = 'fas fa-chess-queen';
// const BLACK_ROOK = 'fas fa-chess-rook';
// const BLACK_BISHOP = 'fas fa-chess-bishop';
// const BLACK_KNIGHT = 'fas fa-chess-knight';
// const BLACK_PAWN = 'fas fa-chess-pawn';

// const whiteKing = 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg';
// const whiteQueen = 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg';
// const whiteRook = 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg';
// const whiteBishop = 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg';
// const whiteKnight = 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg';
// const whitePawn = 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg';
// const blackKing = 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg';
// const blackQueen = 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg';
// const blackRook = 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg';
// const blackBishop = 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg';
// const blackKnight = 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg';
// const blackPawn = 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg';

// const startPieces = [
//     createPieceDiv(blackRook), createPieceDiv(blackKnight), createPieceDiv(blackBishop), createPieceDiv(blackQueen), createPieceDiv(blackKing), createPieceDiv(blackBishop), createPieceDiv(blackKnight), createPieceDiv(blackRook),
//     createPieceDiv(blackPawn), createPieceDiv(blackPawn), createPieceDiv(blackPawn), createPieceDiv(blackPawn), createPieceDiv(blackPawn), createPieceDiv(blackPawn), createPieceDiv(blackPawn), createPieceDiv(blackPawn),
//     '', '', '', '', '', '', '', '',
//     '', '', '', '', '', '', '', '',
//     '', '', '', '', '', '', '', '',
//     '', '', '', '', '', '', '', '',
//     createPieceDiv(whitePawn), createPieceDiv(whitePawn), createPieceDiv(whitePawn), createPieceDiv(whitePawn), createPieceDiv(whitePawn), createPieceDiv(whitePawn), createPieceDiv(whitePawn), createPieceDiv(whitePawn),
//     createPieceDiv(whiteRook), createPieceDiv(whiteKnight), createPieceDiv(whiteBishop), createPieceDiv(whiteQueen), createPieceDiv(whiteKing), createPieceDiv(whiteBishop), createPieceDiv(whiteKnight), createPieceDiv(whiteRook)
// ];

// let selectedPiece = null;

// function createPieceDiv(pieceUrl) {
//     return `
//         <div class="piece">
//             <img src="${pieceUrl}" alt="Chess Piece">
//         </div>
//     `;
// }

// function setGame() {
//     const board = document.getElementById('board');
//     startPieces.forEach((piece, index) => {
//         const square = document.createElement('div');
//         square.classList.add('square');
//         square.innerHTML = piece;
//         if (piece) {
//             square.setAttribute('draggable', true);
//         }
//         square.setAttribute('id', index);
//         square.style.backgroundColor = (Math.floor(index / 8) + index % 8) % 2 === 0 ? 'white' : 'rgb(172, 129, 129)';
//         board.append(square);
//     });

//     const squares = document.querySelectorAll('#board .square');
//     squares.forEach(square => {
//         square.addEventListener('click', (e) => {
//             let clickedSquare = e.target.closest('.square');
//             if (clickedSquare) {
//                 if (selectedPiece) {
//                     movePiece(clickedSquare);
//                 } else {
//                     selectPiece(clickedSquare);
//                 }
//             }
//         });
//     });
// }

// function selectPiece(square) {
//     selectedPiece = square.querySelector('.piece');
//     if (selectedPiece) {
//         square.style.backgroundColor = 'blue';
//     }
// }

// function movePiece(targetSquare) {
//     if (selectedPiece) {
//         targetSquare.appendChild(selectedPiece);
//         selectedPiece = null;
//         clearHighlight();
//     }
// }

// function clearHighlight() {
//     document.querySelectorAll('.square').forEach(square => {
//         square.style.backgroundColor = (Math.floor(square.id / 8) + square.id % 8) % 2 === 0 ? 'white' : 'rgb(172, 129, 129)';
//     });
// }

// setGame();





// let blackBlock = [
//     { x: 0, y: 0 }, { x: 3, y: 0 }, { x: 5, y: 0 }, { x: 7, y: 0 },
//     { x: 2, y: 0 }, { x: 4, y: 0 }, { x: 6, y: 0 }, { x: 8, y: 0 },
//     { x: 0, y: 0 }, { x: 3, y: 0 }, { x: 5, y: 0 }, { x: 7, y: 0 },
//     { x: 2, y: 0 }, { x: 4, y: 0 }, { x: 6, y: 0 }, { x: 8, y: 0 },
//     { x: 0, y: 0 }, { x: 3, y: 0 }, { x: 5, y: 0 }, { x: 7, y: 0 },
//     { x: 2, y: 0 }, { x: 4, y: 0 }, { x: 6, y: 0 }, { x: 8, y: 0 },
//     { x: 0, y: 0 }, { x: 3, y: 0 }, { x: 5, y: 0 }, { x: 7, y: 0 },
//     { x: 2, y: 0 }, { x: 4, y: 0 }, { x: 6, y: 0 }, { x: 8, y: 0 },


// ]









    // const validMoves = [
    //     sPieceId + 17, sPieceId - 17, sPieceId + 10, sPieceId - 10, 
    //     sPieceId + 6, sPieceId - 6, sPieceId + 15, sPieceId - 15
    // ];
    // return validMoves.includes(tSquareId);




























