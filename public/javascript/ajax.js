$(document).ready(function() {
  $('.card').click(function() {
    var card_num = $(this).attr('value');
    $.post("99/turn",{"card":card_num});
  });
});
