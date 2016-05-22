# post turn data (card, action of turn?), player id, and game id here
require 'pry'
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
  @game = Game.find(params[:id])
  @total_data = {
    cards: @cards,
    player_id: @player.id,
    player_castle: @player.castle,
    player_shield: @player.shield,
    player_mana: @player.mana,
    player_stamina: @player.stamina,
    player_gold: @player.gold,
    opponent_id: @opponent.id,
    opponent_castle: @opponent ? @opponent.castle : '',
    opponent_shield: @opponent ? @opponent.shield : '',
    opponent_mana: @opponent ? @opponent.mana : '',
    opponent_stamina:  @opponent ? @opponent.stamina : '',
    opponent_gold:  @opponent ? @opponent.gold : '',
    current_player_id: @game.current_player_id
  }


  body @total_data.to_json

  # if @game.winner_id == @player.id
  #   redirect "/game/winner"
  # end
  # if @game.loser_id == @player.id
  #   redirect "/game/loser"
  # end

end

# get 'game/winner' do
#   erb :'/game/winner'
# end

# get 'game/loser' do
#   erb :'/game/loser'
# end


