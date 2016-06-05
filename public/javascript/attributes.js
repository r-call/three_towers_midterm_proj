var attributes = (function() {

  function refresh() {
    maxStyleIndicators();
  }

  // Enough attributes to play card? Returns boolean
  function enough(cardNum) {
    if (
      game.state.cards[cardNum - 1].mana_cost <= game.state.player_mana &&
      game.state.cards[cardNum - 1].stamina_cost <= game.state.player_stamina &&
      game.state.cards[cardNum - 1].gold_cost <= game.state.player_gold
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
      if ($(this).text().trim() == settings.maxHealth) {
        $(this).addClass('max-attribute');
      } else {
        $(this).removeClass('max-attribute');
      }
    });

    $('.shield-indicator').each(function() {
      if ($(this).text().trim() == settings.maxShield) {
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
