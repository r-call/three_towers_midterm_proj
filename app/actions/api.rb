# post turn data (card, action of turn?), player id, and game id here

post '/games/:id/turn' do
  @game = Game.find(params[:id])
  @game.game_action(params[:action],session[:player_id],params[:card].to_i)
  # puts params[:card]
  # puts params[:action]

  # redirect "/games/#{params[:id]}/"
end

get '/games/:id/reload' do
  @player = Player.find(session[:player_id])
  @cards = @player.show_cards(params[:id])
  @opponent = @player.find_opp(params[:id])
  @total_data = {
    cards: @cards,
    player_castle: @player.castle,
    player_shield: @player.shield,
    player_mana: @player.mana,
    player_stamina: @player.stamina,
    player_gold: @player.gold,
    opponent_castle: @opponent ? @opponent.castle : '',
    opponent_shield: @opponent ? @opponent.shield : '',
    opponent_mana: @opponent ? @opponent.mana : '',
    opponent_stamina:  @opponent ? @opponent.stamina : '',
    opponent_gold:  @opponent ? @opponent.gold : ''
  }

  body @total_data.to_json
end
