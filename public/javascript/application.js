$(function() {

  // Load game settings from DOM on document ready
  settings.gameId = $("#data").attr('game-id');
  settings.playerId = $("#data").attr('player-id');

  // Initialize RocketIO
  settings.io = new RocketIO({channel: settings.gameId}).connect();
  var io = settings.io;
  io.on("connect", function() {
    io.push("new_player", "new player, so everyone refresh");
  });
  io.on("game_updated", function(){
    io.push("reload_request", {game: settings.gameId, player: settings.playerId});
  });
  io.on("reload", reload.all);

  // Set card event handlers
  $('.held-card').click(cards.tryPlay);
  $('.discard-button').click(cards.tryDiscard);

});
