$(document).ready(function() {
  // click card to post data
  // ultimately, we need to distinguish between a discard and play
  $('.card').click(function() {
    var card_num = $(this).attr('value');
    $.get("<%= @game.id %>/turn",{"card":card_num,"action":"play"});
  });

  // refresh every second
  setInterval(function()
  {
    $.ajax({
      type:"get",
      url:"<%= @game.id %>/reload",
      datatype:"html",
      success:function(data)
      {
        var parsed = JSON.parse(data)
          console.log(parsed[2]['description']);
      }
    });
}, 2000);//time in milliseconds

});


// @cards = Card.all
// json_cards = @cards.to_json
// body json_cards
