$(document).ready(function() {
  // click card to post data
  // ultimately, we need to distinguish between a discard and play
  $('.card').click(function() {
    var card_num = $(this).attr('value');
    $.get("99/turn",{"card":card_num});
  });

  // refresh every second
  setInterval(function()
  {
    $.ajax({
      type:"get",
      url:"99/reload",
      datatype:"html",
      success:function(data)
      {
          console.log(data);
      }
    });
}, 10000);//time in milliseconds

});
