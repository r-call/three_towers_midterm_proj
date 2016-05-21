io = Sinatra::RocketIO

io.on :connect do |client|
  puts "new client available - <#{client.session}> type:#{client.type} from:#{client.address}"
  io.push :temperature, 35  # to all clients
  io.push :light, {:value => 150}, {:to => client.session} # to specific client
end
