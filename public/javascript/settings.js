var settings = (function() {

  // PUBLIC

  // Static values
  var values = {
    maxCastle: 100,
    maxShield: 25
  }

  // API

  var api = {
    gameId:       null,
    playerId:     null,
    turnPath:     null,
    reloadPath:   null,
    hasOpponent:  false,
    myTurn:       false,
    values:     values
  }

  return api
})();
