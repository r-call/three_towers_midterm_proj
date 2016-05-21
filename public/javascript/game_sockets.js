var io = new RocketIO().connect();

io.on("temperature", function(value){
  console.log("server temperature : " + value);
}); // => "server temperature : 35"
io.on("light", function(data){
  console.log("server light sensor : " + data.value);
}); // => "server light sensor : 150"
