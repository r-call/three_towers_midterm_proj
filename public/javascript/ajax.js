// $(document).ready(function() {
//   // click card to post data
//   // ultimately, we need to distinguish between a discard and play
//   $('.card').click(function() {
//     var card_num = $(this).attr('value');
//     $.get("1/turn",{"card":card_num});
//   });
//
//   // refresh every second
//   setInterval(function()
//   {
//     $.ajax({
//       type:"get",
//       url:"1/reload",
//       datatype:"html",
//       success:function(data)
//       {
//         var parsed = JSON.parse(data)
//           console.log(parsed[2]['description']);
//       }
//     });
// }, 2000);//time in milliseconds
//
// });
//
//
// // @cards = Card.all
// // json_cards = @cards.to_json
// // body json_cards
