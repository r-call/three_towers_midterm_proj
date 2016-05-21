$(document).ready(function() {
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

  //
  // ajax functions

  function postPlay (card_num,action) {
    $.post(turn_path,{"card":card_num,"action":action});
  }
  // click card to post data
  // ultimately, we need to distinguish between a discard and play
  function canPlay() {
    if (hasOpponent && myTurn) {
      return true;
    } else {
      return false;
    }
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
          $('#hand-card-2 .card-title').text(parsed['cards'][1]['name']);
          $('#hand-card-2 .card-description p').text(parsed['cards'][1]['description']);
          $('#hand-card-2 .card-cost-band p').text(parsed['cards'][1]['card_type']);
          $('#hand-card-3 .card-title').text(parsed['cards'][2]['name']);
          $('#hand-card-3 .card-description p').text(parsed['cards'][2]['description']);
          $('#hand-card-3 .card-cost-band p').text(parsed['cards'][2]['card_type']);
          $('#hand-card-4 .card-title').text(parsed['cards'][3]['name']);
          $('#hand-card-4 .card-description p').text(parsed['cards'][3]['description']);
          $('#hand-card-4 .card-cost-band p').text(parsed['cards'][3]['card_type']);
          $('#hand-card-5 .card-title').text(parsed['cards'][4]['name']);
          $('#hand-card-5 .card-description p').text(parsed['cards'][4]['description']);
          $('#hand-card-5 .card-cost-band p').text(parsed['cards'][4]['card_type']);
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
    checkGameStatus();
  }, 5000); // milliseconds


  // click a card
  $('.card').click(function() {

    var card_num = $(this).attr('value');
    var action = "play";
    // add discard and pass later

    if ( canPlay() ) {
      postPlay(card_num, action);
    } else {
      // temp for testing. should do nothing for else ultimately
      console.log("Can't play without a partner!");
    }
  });


});
