const gameboard = (function() {
  // gameboard module

  // initial private variable of 9 empty strings
  const _gameboard = Array(9).fill('');

  // keeps track of who's turn it is
  let _whosTurn;

  const getWhosTurn = function() { return _whosTurn };

  const setWhosTurn = function(player) { _whosTurn = player };

  const getGameboard = function() { return _gameboard };

  const setGameboard = function(player, moveSpot) {
    // check if move is valid
    if (isValidMove(moveSpot)) {
      // make move
        _gameboard[moveSpot] = player.getPlayerSymbol();
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
    getWhosTurn,
    setWhosTurn,
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

  const _renderBoard = function(gameboard) {
    // create container for board
    const table = document.createElement('table');
    table.id = 'board';

    // get current board state
    const board = gameboard.getGameboard();

    // create row
    for (let i = 0; i < 3; i++) {
      let row = document.createElement('tr');
      // create cells in row
      for (let j = 0; j < 3; j++) {
        let cell = document.createElement('td');
        cell.id = (3 * i + j).toString();
        cell.innerHTML = board[3 * i + j];
        row.append(cell)
      }
      table.append(row);
    }
    document.getElementById('root').replaceChildren(table);
  }

  const updateBoard = function(player, move, gameboard) {
    if (gameboard.setGameboard(player.getPlayerSymbol(), move) === null) {
      // return null if invalid move
      return null
    }
    _renderBoard(gameboard);
  }

  return {
    updateBoard
  }
})();


const game = (function() {
  // module for playing a game of tic-tac-toe
  const start = function() {
    // create gameboard, players, and displayController
    const playerX = Player('X');
    const playerO = Player('O');

    // randomize who goes first and send alert
    if (Math.round(Math.random())) {
      alert('O goes first');
      gameboard.setWhosTurn(playerO);
    } else {
      alert('X goes first');
      gameboard.setWhosTurn(playerX);
    }

    // repeat turn back and forth until game has ended
    while (!_checkGameEnded()) {
      _turn(gameboard.getWhosTurn());
    }
  }

  const _turn = function(player) {
    _wireClickEvents();
    displayController.updateBoard(player);
  }

  const _wireClickEvents = function() {
    for (let i = 0; i < gameboard.getGameboard().length; i++) {
      document.getElementById(i.toString()).addEventListener('click', _moveClicked);
    }
  } 

  const _moveClicked = function() {
    let move = this.id;
    if (null === gameboard.setGameboard(gameboard.getWhosTurn(), move)) {
      alert('That spot has already been taken. Choose another location.');
    } else {
      gameboard.setGameboard(gameboard.getWhosTurn(), move);
      
      // switch whos turn it is
      if (gameboard.getWhosTurn() === playerO) {
        gameboard.setWhosTurn(playerX);
      } else {
        gameboard.setWhosTurn(playerO);
      }
    }
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
    } else {
      return false;
    }
  }

  return {
    start
  }
})();

game.start();