$(document).ready(function() {
  // does not have opponent until the first ajax get
  var hasOpponent = false;
  var myTurn = false;

  var game_id = $("#data").attr('game-id');
  var player_id = $("#data").attr('player-id');

  var turn_path = game_id.concat("/turn");
  var reload_path = game_id.concat("/reload");

  // initialize RocketIO
  var io = new RocketIO({channel: game_id}).connect();

  io.on("connect", function() {
    io.push("reload_request", {"game":game_id, "player":player_id});
  });

  // add class/remove class if max attribute
  $('.castle-indicator').each(function() {
    console.log($(this).text());
    if ( $(this).text().trim() == "100" ) {
      $(this).addClass('max-attribute');
    } else {
      $(this).removeClass('max-attribute');
    }
  });

  $('.shield-indicator').each(function() {
    console.log($(this).text());
    if ( $(this).text().trim() == "25" ) {
      $(this).addClass('max-attribute');
    } else {
      $(this).removeClass('max-attribute');
    }
  });


  function checkGameStatus() {
    if (hasOpponent) {

      if (myTurn) {
        $('#player-alert-box').text("Your turn");
      } else {
        $('#player-alert-box').text("Opponent's turn");
      }

    } else {
      $('#player-alert-box').text('Waiting for partner...');
    }
  }
  function colourCard(card) {
    if ( card.find('.card-type-band p').text() == "Attack" ) {
      card.addClass('attack');
    } else if ( card.find('.card-type-band p').text() == "Magic" ) {
      card.addClass('magic');
    } else if ( card.find('.card-type-band p').text() == "Item" ) {
      card.addClass('item');
    }
  }

  function colourCards() {
    for (i = 1; i <= 5; i++) {
      colourCard( $('.held-card').eq(i - 1) );
    }
  }


  // refresh attribute visibility
  function refreshAttributeDisplay() {
    $('.card-attribute-indicator').each(function(){
      if ($(this).text() != 0) {
        $(this).addClass('inline-block');
      } else if ($(this).text() == 0) {
        $(this).removeClass('inline-block');
      }
    });
  }

  refreshAttributeDisplay();

  function enoughAttributes(card_num) {
    if (
      parseInt( $('.held-card .card-mana-indicator').eq(card_num - 1).text() ) <= parseInt( $('#mana-indicator-p1').text() ) &&
      parseInt( $('.held-card .card-stamina-indicator').eq(card_num - 1).text() ) <= parseInt( $('#stamina-indicator-p1').text() ) &&
      parseInt( $('.held-card .card-gold-indicator').eq(card_num - 1).text() ) <= parseInt( $('#gold-indicator-p1').text() )
    ) {
      return true;
    } else {
      return false;
    }
  }
  function veilCards() {
    for (i = 1; i <= 5; i++) {
      if ( enoughAttributes(i) ) {
        $('.held-card').eq(i - 1).find('.veilable').removeClass('veil');
        $('.held-card.veilable').eq(i - 1).removeClass('veil');
        $('.held-card').eq(i - 1).find('.card-image-image').removeClass('image-veil');
      } else {
        $('.held-card').eq(i - 1).find('.veilable').addClass('veil');
        $('.held-card.veilable').eq(i - 1).addClass('veil');
        $('.held-card').eq(i - 1).find('.card-image-image').addClass('image-veil');
      }
    }
  }

  // can a card be played?
  function canPlay(card_num) {
    if ( hasOpponent && myTurn && enoughAttributes(card_num) ) {
      return true;
    } else {
      return false;
    }
  }

  function postPlay (card_num,action) {
    io.push("play", {"card":card_num,"action":action,"player":player_id});
  }

  io.on("game_updated", function(){
    io.push("reload_request", {"game":game_id, "player":player_id});
  });

  io.on("reload", function(data) {
    var parsed = JSON.parse(data)
      // puts fresh data on the page
      $('#castle-indicator-p1').text(parsed['player_castle']);
      $('#shield-indicator-p1').text(parsed['player_shield']);
      $('#mana-indicator-p1').text(parsed['player_mana']);
      $('#stamina-indicator-p1').text(parsed['player_stamina']);
      $('#gold-indicator-p1').text(parsed['player_gold']);
      $('#castle-indicator-p2').text(parsed['opponent_castle']);
      $('#shield-indicator-p2').text(parsed['opponent_shield']);
      $('#mana-indicator-p2').text(parsed['opponent_mana']);
      $('#stamina-indicator-p2').text(parsed['opponent_stamina']);
      $('#gold-indicator-p2').text(parsed['opponent_gold']);
      $('#hand-card-1 .card-title').text(parsed['cards'][0]['name']);
      $('#hand-card-1 .card-description p').text(parsed['cards'][0]['description']);
      $('#hand-card-1 .card-type-band p').text(parsed['cards'][0]['card_type']);
      $('#hand-card-1 .card-mana-indicator').text(parsed['cards'][0]['mana_cost']);
      $('#hand-card-1 .card-stamina-indicator').text(parsed['cards'][0]['stamina_cost']);
      $('#hand-card-1 .card-gold-indicator').text(parsed['cards'][0]['gold_cost']);
      $('#hand-card-1 .card-image-image').attr("src",parsed['cards'][0]['image_url']);
      $('#hand-card-2 .card-title').text(parsed['cards'][1]['name']);
      $('#hand-card-2 .card-description p').text(parsed['cards'][1]['description']);
      $('#hand-card-2 .card-type-band p').text(parsed['cards'][1]['card_type']);
      $('#hand-card-2 .card-mana-indicator').text(parsed['cards'][1]['mana_cost']);
      $('#hand-card-2 .card-stamina-indicator').text(parsed['cards'][1]['stamina_cost']);
      $('#hand-card-2 .card-gold-indicator').text(parsed['cards'][1]['gold_cost']);
      $('#hand-card-2 .card-image-image').attr("src",parsed['cards'][1]['image_url']);
      $('#hand-card-3 .card-title').text(parsed['cards'][2]['name']);
      $('#hand-card-3 .card-description p').text(parsed['cards'][2]['description']);
      $('#hand-card-3 .card-type-band p').text(parsed['cards'][2]['card_type']);
      $('#hand-card-3 .card-mana-indicator').text(parsed['cards'][2]['mana_cost']);
      $('#hand-card-3 .card-stamina-indicator').text(parsed['cards'][2]['stamina_cost']);
      $('#hand-card-3 .card-gold-indicator').text(parsed['cards'][2]['gold_cost']);
      $('#hand-card-3 .card-image-image').attr("src",parsed['cards'][2]['image_url']);
      $('#hand-card-4 .card-title').text(parsed['cards'][3]['name']);
      $('#hand-card-4 .card-description p').text(parsed['cards'][3]['description']);
      $('#hand-card-4 .card-type-band p').text(parsed['cards'][3]['card_type']);
      $('#hand-card-4 .card-mana-indicator').text(parsed['cards'][3]['mana_cost']);
      $('#hand-card-4 .card-stamina-indicator').text(parsed['cards'][3]['stamina_cost']);
      $('#hand-card-4 .card-gold-indicator').text(parsed['cards'][3]['gold_cost']);
      $('#hand-card-4 .card-image-image').attr("src",parsed['cards'][3]['image_url']);
      $('#hand-card-5 .card-title').text(parsed['cards'][4]['name']);
      $('#hand-card-5 .card-description p').text(parsed['cards'][4]['description']);
      $('#hand-card-5 .card-type-band p').text(parsed['cards'][4]['card_type']);
      $('#hand-card-5 .card-mana-indicator').text(parsed['cards'][4]['mana_cost']);
      $('#hand-card-5 .card-stamina-indicator').text(parsed['cards'][4]['stamina_cost']);
      $('#hand-card-5 .card-gold-indicator').text(parsed['cards'][4]['gold_cost'])
      $('#hand-card-5 .card-image-image').attr("src",parsed['cards'][4]['image_url']);

      colourCards();
      veilCards();

      // populate last played card

      if ( parsed['last_played_card'] ){
        $('#played-card-container .card-title').text(parsed['last_played_card']['name']);
        $('#played-card-container .card-description p').text(parsed['last_played_card']['description']);
        $('#played-card-container .card-type-band p').text(parsed['last_played_card']['card_type']);
        $('#played-card-container .card-mana-indicator').text(parsed['last_played_card']['mana_cost']);
        $('#played-card-container .card-stamina-indicator').text(parsed['last_played_card']['stamina_cost']);
        $('#played-card-container .card-gold-indicator').text(parsed['last_played_card']['gold_cost']);
        $('#played-card-container .card-image-image').attr("src",parsed['last_played_card']['image_url']);
        colourCard( $('#played-card-container') );
        $('#played-card-container').removeClass('invisible');
      } else {
        $('#played-card-container').addClass('invisible');
      }

      refreshAttributeDisplay();
      if ( parsed['current_game_winner_id'] && (parsed['current_game_winner_id'] == parsed['player_id']) ) {
        window.location.href = 'winner';
      } else if ( parsed['current_game_winner_id'] && (parsed['current_game_winner_id'] != parsed['player_id']) ) {
        window.location.href = 'loser';
      }
      // hacky way of checking if there's an opponent
      if (typeof parsed['opponent_castle'] == 'number') {
        hasOpponent = true;
      } else {
        hasOpponent = false;
      }
      if (parsed['current_player_id'] == parsed['player_id']) {
        myTurn = true;
      } else {
        myTurn = false;
      }
      checkGameStatus();
    });

  // veil cards on page load
  veilCards();

  // click a card
  $('.held-card').click(function() {
    var card_num = $(this).attr('value');
    if ( canPlay(card_num) ) {
      postPlay(card_num, "play");
    } else {
      // temp for testing. should do nothing for else ultimately
      console.log("Can't play - no opponent or not your turn");
    }
  });

  // click discard button
  $('.discard-button').click(function(event) {
    event.stopPropagation(); //prevents parent handlers from being notified of event
    var card_num = $(this).attr('value');
    if ( hasOpponent && myTurn ) {
      postPlay(card_num, "discard"); //postPlay defined above
    } else {
      console.log("Can't discard - no opponent or not your turn")
    }
  });

  // click pass button
  $('#pass-button').click(function() {
    if ( hasOpponent && myTurn ) {
      postPlay(null,"pass");
    } else {
      console.log("Can't pass - no opponent or not your turn");
    }
  });

  // display attribute costs for cards

  $('.card-attribute-indicator').each(function(){
    if ($(this).text() != 0) {
      $(this).toggleClass('inline-block');
    }
  });


});
