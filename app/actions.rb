
#'/game' is the entry point. A new player is created when you visit. Your player ID is stored as a session cookie.

get '/game' do
  if session[:player_id].nil?
    @player = Player.create
    session[:player_id] = @player.id
  else
    @player = Player.find(session[:player_id])
  end
  # if there's a game with an open P2 spot, take that spot
  # otherwise create new game as P1
  first_available_game = Game.where(player_1_id: !@player.id, player_2_id: nil).first
  if first_available_game.nil?
    @game = Game.create(player_1_id: @player.id)
    @player.generate_hand(@game.id)
  else
    @game = first_available_game
    @game.update(player_2_id: @player.id)
    @player.generate_hand(@game.id)
  end



  redirect "game/1"
  # redirect "game/#{@game.id}"
end

# the main game view is shown at '/game/:id'

get '/game/:id' do
  @player = Player.find(session[:player_id])
  @cards = @player.show_cards(params[:id])
  # @opponent = @player.find_opp(params[:id])

  erb :'game/index'
end

# post turn data (card, action of turn?), player id, and game id here

get '/game/:id/turn' do
  # @game = Game.find(params[:id])
  # @game.game_action(params[:move],sessions[:player_id],params[:card])
  puts params[:card]
  redirect '/game/:id/reload'
end

get '/game/:id/reload' do
  # @player = Player.find(session[:player_id])
  # @cards = @player.show_cards(@game.id)
  # @opponent = @player.find_opp(@game.id)
  "Reloads once per second"
end
