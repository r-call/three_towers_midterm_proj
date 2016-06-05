var game = (function() {

  // STATE

  // Holds all game data
  var state = {};

  // PUBLIC

  // Refresh and display game settings
  function refresh(data) {
    tryGameOver();
    setHasOpponent();
    setMyTurn();
    showStatus();
  }

  // Play or discard a card
  function postPlay(cardNum,action) {
    var params = {
      card:   cardNum,
      action: action,
      player: settings.playerId
    }
    utilities.io.push("play", params);
  }

  // PRIVATE

  // Update status banner
  function showStatus() {
    if (settings.hasOpponent) {
      if (settings.myTurn) {
        $('#player-alert-box').text("Your turn");
      } else {
        $('#player-alert-box').text("Opponent's turn");
      }
    } else {
      $('#player-alert-box').text('Waiting for partner...');
    }
  }

  // Update hasOpponent attribute
  function setHasOpponent() {
    if (typeof game.state.opponent_id === 'number') {
      settings.hasOpponent = true;
    } else {
      settings.hasOpponent = false;
    }
  }

  // Update myTurn attribute
  function setMyTurn() {
    if (game.state.current_player_id == settings.playerId) {
      settings.myTurn = true;
    } else {
      settings.myTurn = false;
    }
  }

  // End the game if someone won
  function tryGameOver() {
    var winner = game.state.current_game_winner_id;
    if ( winner && (winner == settings.playerId) ) {
      window.location.href = 'winner';
    } else if ( winner && (winner != settings.playerId) ) {
      window.location.href = 'loser';
    }
  }

  // API

  var api = {
    refresh:        refresh,
    postPlay:       postPlay,
    state:          state
  }

  return api
})();
