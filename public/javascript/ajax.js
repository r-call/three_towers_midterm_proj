$(document).ready(function() {
  var game_id = $("#data").attr('game-id');
  var turn_path = game_id.concat("/turn");
  var reload_path = game_id.concat("/reload");
  // click card to post data
  // ultimately, we need to distinguish between a discard and play
  $('.card').click(function() {
    var card_num = $(this).attr('value');
    $.post(turn_path,{"card":card_num,"action":"play"});
  });

  // refresh every second
  setInterval(function()
  {
    $.ajax({
      type:"get",
      url: reload_path,
      datatype:"html",
      success:function(data)
      {
        var parsed = JSON.parse(data)
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
      }
    });
}, 2000);//time in milliseconds

});


// @cards = Card.all
// json_cards = @cards.to_json
// body json_cards
