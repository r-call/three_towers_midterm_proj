$(function() {

  // Load game settings from DOM on document ready
  settings.gameId = $('#data').attr('game-id');
  settings.playerId = $('#data').attr('player-id');

  // Initialize RocketIO
  var io = utilities.io = new RocketIO({channel: settings.gameId})
    .connect();
  io.on('connect', function() {
    io.push('new_player', 'new player, so everyone refresh');
  });
  io.on('game_updated', function() {
    io.push('reload_request', {game: settings.gameId, player: settings.playerId});
  });
  io.on('reload', utilities.refreshAll);
  io.on('error', errors.ioError);

  // Set card event handlers
  $('#hand').on('click', '.held-card', cards.tryPlay);
  $('#hand').on('click', '.discard-button', cards.tryDiscard);

});
