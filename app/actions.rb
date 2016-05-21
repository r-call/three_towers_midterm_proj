require_relative './actions/api'

#'/game' is the entry point. A new player is created when you visit. Your player ID is stored as a session cookie.
get '/games/new' do

  erb :'game/new', layout: :new_layout
end

post '/games' do
  if session[:player_id].nil?
    @player = Player.create
    session[:player_id] = @player.id
  else
    @player = Player.find(session[:player_id])
  end
  # if there's a game with an open P2 spot, take that spot
  # otherwise create new game as P1
  first_available_game = Game.where(player_2_id: nil).where.not(player_1_id: @player.id).first
  if Game.find_by(player_1_id: @player.id)
    @game = Game.find_by(player_1_id: @player.id)
  elsif
    Game.find_by(player_2_id: @player.id)
    @game = Game.find_by(player_2_id: @player.id)
  elsif
    first_available_game.nil?
    @game = Game.create(player_1_id: @player.id)
    @player.generate_hand(@game.id)
  else
    @game = first_available_game
    @game.update(player_2_id: @player.id)
    @game.first_player_setter
    @player.generate_hand(@game.id)
  end

  redirect "games/#{@game.id}"
end

# the main game view is shown at '/game/:id'

get '/games/:id' do
  @player = Player.find(session[:player_id])
  @cards = @player.show_cards(params[:id])
  @opponent = @player.find_opp(params[:id])
  @game_id = params[:id]

  erb :'game/index'
end
