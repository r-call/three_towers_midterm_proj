# post turn data (card, action of turn?), player id, and game id here

get '/games/:id/turn' do
  @game = Game.find(params[:id])
  @game.game_action(params[:action],session[:player_id],params[:card])
  puts params[:card]
  puts params[:action]
  redirect '/games/:id/reload'
end

get '/games/:id/reload' do
  @player = Player.find(session[:player_id])
  @cards = @player.show_cards(params[:id])
  body @cards.to_json
  # @opponent = @player.find_opp(@game.id)
end
