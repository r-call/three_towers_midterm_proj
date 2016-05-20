$(document).ready(function() {
  var game_id = $("#data").attr('game-id');
  // click card to post data
  // ultimately, we need to distinguish between a discard and play
  $('.card').click(function() {
    var card_num = $(this).attr('value');
    $.post(game_id + "/turn",{"card":card_num,"action":"play"});
  });

  // refresh every second
  setInterval(function()
  {
    $.ajax({
      type:"get",
      url:game_id + "/reload",
      datatype:"html",
      success:function(data)
      {
        var parsed = JSON.parse(data)
          $('#castle-indicator-p1').text(parsed['castle']);
          $('#shield-indicator-p1').text(parsed['shield']);
          $('#mana-indicator-p1').text(parsed['mana']);
          $('#stamina-indicator-p1').text(parsed['stamina']);
          $('#gold-indicator-p1').text(parsed['gold']);
      }
    });
}, 2000);//time in milliseconds

});


// @cards = Card.all
// json_cards = @cards.to_json
// body json_cards
