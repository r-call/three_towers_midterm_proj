$(document).ready(function() {
  // alert( $('.card-mana-indicator')[0] );
  // does not have opponent until the first ajax get
  var hasOpponent = false;
  var myTurn = false;

  // for ajax calls
  var game_id = $("#data").attr('game-id');
  var turn_path = game_id.concat("/turn");
  var reload_path = game_id.concat("/reload");


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

  function enoughAttributes(card_num) {
    if (
      $('.held-card .card-title .card-mana-indicator')[card_num - 1].text() >= $('#mana-indicator-p1').text() &&
      $('.held-card .card-title .card-stamina-indicator')[card_num - 1].text() >= $('#stamina-indicator-p1').text() &&
      $('.held-card .card-title .card-gold-indicator')[card_num - 1].text() >= $('#gold-indicator-p1').text()
    ) {
      return true;
    } else {
      return false;
    }
  }

  function veilCards() {
    for (i = 1; i <= 5; i++) {
      if ( enoughAttributes(i) ) {
        $('.heldcard')[i - 1].find('.veilable').removeClass('veil');
      } else {
        $('.heldcard')[i - 1].find('.veilable').addClass('veil');
      }
    }
  }

  // can a card be played?
  function canPlay(card_num) {
    if ( hasOpponent && myTurn && enoughAttributes(card_num) ) {
    if (hasOpponent && myTurn ) {
      return true;
    } else {
      return false;
    }
  }
  
  //
  // ajax functions

  function postPlay (card_num,action) {
    $.post(turn_path,{"card":card_num,"action":action});
  }

  function refreshData(){
    $.ajax({
      type:"get",
      url: reload_path,
      datatype:"html",
      success:function(data)
      {
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
          $('#hand-card-1 .card-cost-band p').text(parsed['cards'][0]['card_type']);
          $('#hand-card-1 .card-mana-indicator').text(parsed['cards'][0]['mana_cost']);
          $('#hand-card-1 .card-stamina-indicator').text(parsed['cards'][0]['stamina_cost']);
          $('#hand-card-1 .card-gold-indicator').text(parsed['cards'][0]['gold_cost']);
          $('#hand-card-2 .card-title').text(parsed['cards'][1]['name']);
          $('#hand-card-2 .card-description p').text(parsed['cards'][1]['description']);
          $('#hand-card-2 .card-cost-band p').text(parsed['cards'][1]['card_type']);
          $('#hand-card-2 .card-mana-indicator').text(parsed['cards'][1]['mana_cost']);
          $('#hand-card-2 .card-stamina-indicator').text(parsed['cards'][1]['stamina_cost']);
          $('#hand-card-2 .card-gold-indicator').text(parsed['cards'][1]['gold_cost']);
          $('#hand-card-3 .card-title').text(parsed['cards'][2]['name']);
          $('#hand-card-3 .card-description p').text(parsed['cards'][2]['description']);
          $('#hand-card-3 .card-cost-band p').text(parsed['cards'][2]['card_type']);
          $('#hand-card-3 .card-mana-indicator').text(parsed['cards'][2]['mana_cost']);
          $('#hand-card-3 .card-stamina-indicator').text(parsed['cards'][2]['stamina_cost']);
          $('#hand-card-3 .card-gold-indicator').text(parsed['cards'][2]['gold_cost']);
          $('#hand-card-4 .card-title').text(parsed['cards'][3]['name']);
          $('#hand-card-4 .card-description p').text(parsed['cards'][3]['description']);
          $('#hand-card-4 .card-cost-band p').text(parsed['cards'][3]['card_type']);
          $('#hand-card-4 .card-mana-indicator').text(parsed['cards'][3]['mana_cost']);
          $('#hand-card-4 .card-stamina-indicator').text(parsed['cards'][3]['stamina_cost']);
          $('#hand-card-4 .card-gold-indicator').text(parsed['cards'][3]['gold_cost']);
          $('#hand-card-5 .card-title').text(parsed['cards'][4]['name']);
          $('#hand-card-5 .card-description p').text(parsed['cards'][4]['description']);
          $('#hand-card-5 .card-cost-band p').text(parsed['cards'][4]['card_type']);
          $('#hand-card-5 .card-mana-indicator').text(parsed['cards'][4]['mana_cost']);
          $('#hand-card-5 .card-stamina-indicator').text(parsed['cards'][4]['stamina_cost']);
          $('#hand-card-5 .card-gold-indicator').text(parsed['cards'][4]['gold_cost']);
          // refresh attribute costs for cards
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

        }
    });
  }


  // refresh data every few seconds
  setInterval(function()
  {
    refreshData();
    refreshAttributeDisplay();
    veilCards();
    checkGameStatus();
  }, 5000); // milliseconds


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
    event.stopPropagation();
    var card_num = $(this).attr('value');
    if ( hasOpponent && myTurn ) {
      postPlay(card_num, "discard");
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
