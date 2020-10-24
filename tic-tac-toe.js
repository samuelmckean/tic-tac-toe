const gameboard = (function() {
  // gameboard module

  // initial private variable of 9 empty strings
  const _gameboard = Array(9).fill('');

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
    };
    _renderBoard(gameboard);
  }

  return {
    updateBoard
  }
})();

// create two Player objects with symbols X and O
const playerX = Player('X');
const playerO = Player('O');

// test rendering board
displayController.updateBoard(playerO, 1, gameboard);