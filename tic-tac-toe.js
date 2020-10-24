const gameboard = (function () {
  // gameboard module

  // initial private variable of 9 empty strings
  const _gameboard = Array(9).fill('');

  const getGameboard = function () { return _gameboard };

  const setGameboard = function (playerSymbol, moveSpot) {
    // check if move is valid
    if (moveSpot < _gameboard.length && moveSpot >= 0) {
      // make move
        _gameboard[moveSpot] = playerSymbol;
    } else {
      // return null if invalid move
      return null;
    }
  }
  
  return {
    getGameboard,
    setGameboard
  }
})();


const Player = function (playerSymbol) {
  // factory function for creating instance of Player object
  
  const _playerSymbol = playerSymbol;
  
  const getPlayerSymbol = function () { return _playerSymbol };

  return {
    getPlayerSymbol
  }
}

// create two Player objects with symbols X and O
const playerX = Player('X');
const playerO = Player('O');

