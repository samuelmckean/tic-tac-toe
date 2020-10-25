const gameboard = (function() {
  // gameboard module

  // initial private variable of 9 empty strings
  const _gameboard = Array(9).fill('');

  // stores object of player whos turn it is
  let whosTurn;

  const getGameboard = function() { return _gameboard };

  const setGameboard = function(playerSymbol, moveSpot) {
    // check if move is valid
    if (isValidMove(moveSpot)) {
      // make move
        _gameboard[moveSpot] = playerSymbol;
    } else {
      // return null if invalid move
      return null;
    }
  }

  const isValidMove = function(moveSpot) {
    // checks that a move is on the board and the spot is not already taken
    if (moveSpot < _gameboard.length && moveSpot >= 0 && _gameboard[moveSpot] === '') {
      return true;
    }
    return false;
  }
  
  return {
    whosTurn,
    getGameboard,
    setGameboard,
    isValidMove
  }
})();


const Player = function(playerSymbol) {
  // factory function for creating instance of Player object
  
  const _playerSymbol = playerSymbol;
  
  const getPlayerSymbol = function() { return _playerSymbol };

  return {
    getPlayerSymbol
  }
}


const displayController = (function() {
  // module for controlling the html display and creating event listeners

  const renderBoard = function(gameboard) {
    // create container for board
    const table = document.createElement('table');
    table.id = 'board';

    // get current board state
    let board = gameboard.getGameboard();

    // create row
    for (let i = 0; i < 3; i++) {
      let row = document.createElement('tr');
      // create cells in row
      for (let j = 0; j < 3; j++) {
        let cell = document.createElement('td');
        cell.id = (3 * i + j).toString();
        cell.innerHTML = board[3 * i + j];
        cell.addEventListener('click', _moveClicked);
        row.append(cell)
      }
      table.append(row);
    }
    document.getElementById('root').replaceChildren(table);
  }

  const _moveClicked = function() {
    let move = this.id;
    while (true) {
      if (null === gameboard.setGameboard(gameboard.whosTurn, move)) {
        alert('That spot has already been taken. Choose another location.');
      } else {
        gameboard.setGameboard(gameboard.whosTurn, move);
        // switch whos turn it is
        if (gameboard.whosTurn === 'O') {
          gameboard.whosTurn = 'X';
        } else {
          gameboard.whosTurn = 'O';
        }
        // check if game has ended
        if (_checkGameEnded === null) {
          alert('Tie.');
        } else if (_checkGameEnded()) {
          alert(`${gameboard.whosTurn} has won!`);
        }
        break;
      }
    }
    renderBoard(gameboard);
  }

  const _checkGameEnded = function() {
    const currentBoard = gameboard.getGameboard();
    // check rows
    if (currentBoard[0] !== '' && currentBoard[0] === currentBoard[1] && currentBoard[0] === currentBoard[2]) {
      return true;
    } else if (currentBoard[3] !== '' && currentBoard[3] === currentBoard[4] && currentBoard[3] === currentBoard[5]) {
      return true;
    } else if (currentBoard[6] !== '' && currentBoard[6] === currentBoard[7] && currentBoard[6] === currentBoard[8]) {
      return true;
    // check diagonals
    } else if (currentBoard[0] !== '' && currentBoard[0] === currentBoard[4] && currentBoard[0] === currentBoard[8]) {
      return true;
    } else if (currentBoard[2] !== '' && currentBoard[2] === currentBoard[4] && currentBoard[2] === currentBoard[6]) {
      return true;
    // check columns
    } else if (currentBoard[0] !== '' && currentBoard[0] === currentBoard[3] && currentBoard[0] === currentBoard[6]) {
      return true;
    } else if (currentBoard[1] !== ''&& currentBoard[1] === currentBoard[4] && currentBoard[1] === currentBoard[7]) {
      return true;
    } else if (currentBoard[2] !== '' && currentBoard[2] === currentBoard[5] && currentBoard[2] === currentBoard[8]) {
      return true;
    // all spaces have been taken up
    } else if (!currentBoard.includes('')) {
      return null;
    // the game continues
    } else {
      return false;
    }
  }

  return {
    renderBoard
  }
})();


const game = (function() {
  // module for playing a game of tic-tac-toe
  const start = function() {
    // create gameboard, players, and displayController
    const playerX = Player('X');
    const playerO = Player('O');
    displayController.renderBoard(gameboard);

    // randomize who goes first and send alert
    if (Math.round(Math.random())) {
      alert('O goes first');
      gameboard.whosTurn = 'O';
    } else {
      alert('X goes first');
      gameboard.whosTurn = 'X';
    }
  }

  return {
    start
  }
})();

game.start();