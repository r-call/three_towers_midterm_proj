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
    opponent_id: @opponent ? @opponent.id : '',
    opponent_castle: @opponent ? @opponent.castle : '',
    opponent_shield: @opponent ? @opponent.shield : '',
    opponent_mana: @opponent ? @opponent.mana : '',
    opponent_stamina:  @opponent ? @opponent.stamina : '',
    opponent_gold:  @opponent ? @opponent.gold : '',
    current_player_id: @game.current_player_id,
    current_game_winner_id: @game.winner_id,
    current_game_loser_id: @game.loser_id,
    curr_player_mana_regen: @player.stamina_regen_rate,
    curr_player_stamina_regen: @player.mana_regen_rate,
    curr_player_gold_regen: @player.gold_regen_rate
  }


  body @total_data.to_json

end

get '/games/winner' do
  session.clear
  erb :'/game/winner'
end

get '/games/loser' do
  session.clear
  erb :'/game/loser'
end
