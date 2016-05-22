# io = Sinatra::RocketIO

# io.on :connect do |client|
#   puts "new client available - <#{client.session}> type:#{client.type} from:#{client.address}"
#   io.push :temperature, 35  # to all clients
#   io.push :light, {:value => 150}, {:to => client.session} # to specific client
# end

io = Sinatra::RocketIO

io.on :connect do |client|
  msg = "New player #{client.session} in game: #{client.channel}"
  io.push :announce, msg, :channel => client.channel  # to all clients in Channel "ch1"
end

io.on :hi do |msg, client|
  puts "Player #{client.session} says #{msg} (channel:#{client.channel})"
  # => "client says haaaaaaaai!! (channel:ch1)"
end

#on game join, connect to proper channel