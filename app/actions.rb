
#'/game' is the entry point. A new player is created when you visit. Your player ID is stored as a session cookie.

get '/game' do
  @player = Player.create
  session[:player_id] = @player.id
  # TO DO: LOGIC TO FIGURE OUT HOW TO ASSIGN PLAYERS TO GAME NUMBERS
  # redirecting to game 99 as a hack
  redirect 'game/99'
end

# the main game view is shown at '/game/:id'

get '/game/:id' do
  File.read(File.join('public', 'game.html'))
  # TO DO: initial load of all game data
  @player = Player.find(session[:id])

end

# post turn data (card, action of turn?), player id, and game id here

post '/game/:id/turn' do
  puts params[:card]
  puts params[:id]
  puts session[:player_id]
end

get '/game/:id/reload' do

end
