const gameboard = (function () {
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

gameboard.setGameboard('X', 1);
console.log(gameboard.setGameboard('O', -1));
console.log(gameboard.setGameboard('O', 9));
gameboard.setGameboard('O', 4);
console.log(gameboard.getGameboard());