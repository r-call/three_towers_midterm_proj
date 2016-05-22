// var io = new RocketIO().connect();

// io.on("temperature", function(value){
//   console.log("server temperature : " + value);
// }); // => "server temperature : 35"
// io.on("light", function(data){
//   console.log("server light sensor : " + data.value);
// }); // => "server light sensor : 150"

$(document).ready(function() {
  var game_id = $("#data").attr('game-id');

  var io = new RocketIO({channel: game_id}).connect();  // set channel "ch1"

  io.on("connect", function(){
    io.push("hi", "Player joined game:#{game_id}");
  });

  io.on("announce", function(msg){
    alert(msg);
    // => alert "new client a1b2cde345fg in ch1"
  });
});