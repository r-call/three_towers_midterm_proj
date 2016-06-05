var game = (function() {

  function refresh(data) {
    checkGameOver(game.state.current_game_winner_id, settings.playerId);
    setHasOpponent(game.state.opponent_id);
    setMyTurn(game.state.current_player_id);
    showStatus();
  }

  function postPlay(cardNum,action) {
    var params = {
      card:   cardNum,
      action: action,
      player: settings.playerId
    }
    settings.io.push("play", params);
  }

  // PRIVATE

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

  function setHasOpponent(id) {
    if (typeof id === 'number') {
      settings.hasOpponent = true;
    } else {
      settings.hasOpponent = false;
    }
  }

  function setMyTurn(currentPlayer) {
    if (currentPlayer == settings.playerId) {
      settings.myTurn = true;
    } else {
      settings.myTurn = false;
    }
  }

  function checkGameOver(winner,playerId) {
    if ( winner && (winner == playerId) ) {
      window.location.href = 'winner';
    } else if ( winner && (winner != playerId) ) {
      window.location.href = 'loser';
    }
  }

  // STATE
  // Hold all game data

  var state = {}

  // API

  var api = {
    refresh:        refresh,
    postPlay:       postPlay,
    state:          state
  }

  return api
})();
