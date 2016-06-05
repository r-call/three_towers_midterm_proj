var cards = (function() {

  // PUBLIC

  // Refresh card display
  function refresh() {
    colourCards();
    refreshAttributeDisplay();
    setDiscardDisplay();
    veil();
  }

  // Can card be played?
  function canPlay(cardNum) {
    if ( settings.hasOpponent && settings.myTurn && attributes.enough(cardNum) ) {
      return true;
    } else {
      return false;
    }
  }

  // Try to play a card
  function tryPlay(event) {
    event.stopPropagation();
    var cardNum = $(this).attr('value');
    if (cards.canPlay(cardNum)) {
      game.postPlay(cardNum, "play");
      settings.myTurn = false;
    } else {
      // Do nothing
    }
  }

  // Try to discard a card
  function tryDiscard(event) {
    event.stopPropagation();
    var cardNum = $(this).attr('value');
    if ( settings.hasOpponent && settings.myTurn ) {
      game.postPlay(cardNum, "discard");
      settings.myTurn = false;
    } else {
      // Do nothing
    }
  }

  // PRIVATE

  // Colour a single card
  function colour(card) {
    if ( card.find('.card-type-band p').text() == "Attack" ) {
      card.addClass('attack').removeClass('item magic');
    } else if ( card.find('.card-type-band p').text() == "Magic" ) {
      card.addClass('magic').removeClass('item attack');
    } else if ( card.find('.card-type-band p').text() == "Item" ) {
      card.addClass('item').removeClass('attack magic');
    }
  }

  // Colour player's hand
  function colourCards() {
    for (i = 1; i <= 5; i++) {
      colour( $('.held-card').eq(i - 1) );
    }
    colour($('#played-card-container'));
  }

  // Update card attribute costs
  function refreshAttributeDisplay() {
    $('.card-attribute-indicator').each(function(){
      if ($(this).text() != 0) {
        $(this).addClass('inline-block');
      } else if ($(this).text() == 0) {
        $(this).removeClass('inline-block');
      }
    });
  }

  // Show discard button if it's player's turn
  function setDiscardDisplay() {
    if (settings.myTurn == true) {
      $('.discard-button').removeClass('invisible');
    } else {
      $('.discard-button').addClass('invisible');
    }
  }

  // Veil unplayable cards
  function veil() {
    for (cardNum = 1; cardNum <= 5; cardNum++) {
      if ( attributes.enough(cardNum) ) {
        $('.held-card').eq(cardNum - 1).find('.veilable').removeClass('veil');
        $('.held-card.veilable').eq(cardNum - 1).removeClass('veil');
        $('.held-card').eq(cardNum - 1).find('.card-image-image').removeClass('image-veil');
      } else {
        $('.held-card').eq(cardNum - 1).find('.veilable').addClass('veil');
        $('.held-card.veilable').eq(cardNum - 1).addClass('veil');
        $('.held-card').eq(cardNum - 1).find('.card-image-image').addClass('image-veil');
      }
    }
  }

  // API

  var api = {
    refresh: refresh,
    canPlay: canPlay,
    tryPlay: tryPlay,
    tryDiscard: tryDiscard
  }

  return api
})();
