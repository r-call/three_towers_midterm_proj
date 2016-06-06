var utilities = (function() {

  // IO

  // Stores rocket.io
  var io = null;

  // PUBLIC

  // Reload data, adjust game settings, update game state
  function refreshAll(data) {
    game.state = JSON.parse(data);
      // puts fresh data on the page
      reloadAllData();
      game.refresh();
      cards.refresh();
      attributes.refresh();
  }

  // PRIVATE

  // Reloads game data into the DOM
  function reloadAllData() {
    $('#castle-indicator-p1').text(game.state.player_castle);
    $('#shield-indicator-p1').text(game.state.player_shield);
    $('#mana-indicator-p1 h1 h1').text(game.state.player_mana);
    $('#stamina-indicator-p1 h1').text(game.state.player_stamina);
    $('#gold-indicator-p1 h1').text(game.state.player_gold);
    $('#castle-indicator-p2').text(game.state.opponent_castle);
    $('#shield-indicator-p2').text(game.state.opponent_shield);
    $('#mana-indicator-p2 h1').text(game.state.opponent_mana);
    $('#stamina-indicator-p2 h1').text(game.state.opponent_stamina);
    $('#gold-indicator-p2 h1').text(game.state.opponent_gold);
    $('#hand-card-1 .card-title').text(game.state.cards[0].name);
    $('#hand-card-1 .card-description p').text(game.state.cards[0].description);
    $('#hand-card-1 .card-type-band p').text(game.state.cards[0].card_type);
    $('#hand-card-1 .card-mana-indicator').text(game.state.cards[0].mana_cost);
    $('#hand-card-1 .card-stamina-indicator').text(game.state.cards[0].stamina_cost);
    $('#hand-card-1 .card-gold-indicator').text(game.state.cards[0].gold_cost);
    $('#hand-card-1 .card-image-image').attr("src",game.state.cards[0].image_url);
    $('#hand-card-2 .card-title').text(game.state.cards[1].name);
    $('#hand-card-2 .card-description p').text(game.state.cards[1].description);
    $('#hand-card-2 .card-type-band p').text(game.state.cards[1].card_type);
    $('#hand-card-2 .card-mana-indicator').text(game.state.cards[1].mana_cost);
    $('#hand-card-2 .card-stamina-indicator').text(game.state.cards[1].stamina_cost);
    $('#hand-card-2 .card-gold-indicator').text(game.state.cards[1].gold_cost);
    $('#hand-card-2 .card-image-image').attr("src",game.state.cards[1].image_url);
    $('#hand-card-3 .card-title').text(game.state.cards[2].name);
    $('#hand-card-3 .card-description p').text(game.state.cards[2].description);
    $('#hand-card-3 .card-type-band p').text(game.state.cards[2].card_type);
    $('#hand-card-3 .card-mana-indicator').text(game.state.cards[2].mana_cost);
    $('#hand-card-3 .card-stamina-indicator').text(game.state.cards[2].stamina_cost);
    $('#hand-card-3 .card-gold-indicator').text(game.state.cards[2].gold_cost);
    $('#hand-card-3 .card-image-image').attr("src",game.state.cards[2].image_url);
    $('#hand-card-4 .card-title').text(game.state.cards[3].name);
    $('#hand-card-4 .card-description p').text(game.state.cards[3].description);
    $('#hand-card-4 .card-type-band p').text(game.state.cards[3].card_type);
    $('#hand-card-4 .card-mana-indicator').text(game.state.cards[3].mana_cost);
    $('#hand-card-4 .card-stamina-indicator').text(game.state.cards[3].stamina_cost);
    $('#hand-card-4 .card-gold-indicator').text(game.state.cards[3].gold_cost);
    $('#hand-card-4 .card-image-image').attr("src",game.state.cards[3].image_url);
    $('#hand-card-5 .card-title').text(game.state.cards[4].name);
    $('#hand-card-5 .card-description p').text(game.state.cards[4].description);
    $('#hand-card-5 .card-type-band p').text(game.state.cards[4].card_type);
    $('#hand-card-5 .card-mana-indicator').text(game.state.cards[4].mana_cost);
    $('#hand-card-5 .card-stamina-indicator').text(game.state.cards[4].stamina_cost);
    $('#hand-card-5 .card-gold-indicator').text(game.state.cards[4].gold_cost)
    $('#hand-card-5 .card-image-image').attr("src",game.state.cards[4].image_url);
    $('#mana-regen-indicator-p1').text("+" + game.state.curr_player_mana_regen);
    $('#stamina-regen-indicator-p1').text("+" + game.state.curr_player_stamina_regen);
    $('#gold-regen-indicator-p1').text("+" + game.state.curr_player_gold_regen);
    $('#mana-regen-indicator-p2').text("+" + game.state.opp_mana_regen);
    $('#stamina-regen-indicator-p2').text("+" + game.state.opp_stamina_regen);
    $('#gold-regen-indicator-p2').text("+" + game.state.opp_gold_regen);
    if ( game.state.last_played_card ){
      $('#played-card-container .card-title').text(game.state.last_played_card.name);
      $('#played-card-container .card-description p').text(game.state.last_played_card.description);
      $('#played-card-container .card-type-band p').text(game.state.last_played_card.card_type);
      $('#played-card-container .card-mana-indicator').text(game.state.last_played_card.mana_cost);
      $('#played-card-container .card-stamina-indicator').text(game.state.last_played_card.stamina_cost);
      $('#played-card-container .card-gold-indicator').text(game.state.last_played_card.gold_cost);
      $('#played-card-container .card-image-image').attr("src",game.state.last_played_card.image_url);
      $('#played-card-container').removeClass('invisible');
    } else {
      $('#played-card-container').addClass('invisible');
    }
  }


  // API

  var api = {
    refreshAll: refreshAll,
    io:         io
  }

  return api;
})();
