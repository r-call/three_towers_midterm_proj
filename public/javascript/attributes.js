var attributes = (function() {

  // PUBLIC

  // Refresh attribute displays
  function refresh() {
    maxStyleIndicators();
  }

  // Enough attributes to play card? Returns boolean
  function enough(cardNum) {
    var card = game.state.cards[cardNum - 1];
    if (
      card.mana_cost <= game.state.player_mana &&
      card.stamina_cost <= game.state.player_stamina &&
      card.gold_cost <= game.state.player_gold
    ) {
      return true;
    } else {
      return false;
    }
  }

  // PRIVATE

  // Add class/remove class if max attribute level
  function maxStyleIndicators() {
    $('.castle-indicator').each(function() {
      if ($(this).text().trim() == settings.values.maxCastle) {
        $(this).addClass('max-attribute');
      } else {
        $(this).removeClass('max-attribute');
      }
    });
    $('.shield-indicator').each(function() {
      if ($(this).text().trim() == settings.values.maxShield) {
        $(this).addClass('max-attribute');
      } else {
        $(this).removeClass('max-attribute');
      }
    });
  }

  // API

  var api = {
    refresh: refresh,
    enough: enough
  }

  return api
})();
