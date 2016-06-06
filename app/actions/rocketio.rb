# io = Sinatra::RocketIO

# io.on :connect do |client|
#   puts "new client available - <#{client.session}> type:#{client.type} from:#{client.address}"
#   io.push :temperature, 35  # to all clients
#   io.push :light, {:value => 150}, {:to => client.session} # to specific client
# end

io = Sinatra::RocketIO

io.on :new_player do |msg,client|
  io.push :game_updated, "update your game, something changed", :channel => client.channel
end

io.on :play do |msg, client|
  @game = Game.find(client.channel.to_i)
  @game.game_action(msg['action'],msg['player'].to_i,msg['card'].to_i)
  # #individual update
  # ind_msg =
  # io.push :reload_hand, ind_msg, :to => client.session

  #group update
  io.push :game_updated, "update your game, something changed", :channel => client.channel
end



io.on :reload_request do |msg, client|
  #sends all game data back to client
  # get '/games/:id/reload' do
  @player = Player.find(msg['player'].to_i)
  pp @player
  @cards = @player.show_cards(msg['game'].to_i)
  pp @cards
  @opponent = @player.find_opp(msg['game'])
  @game = Game.find(msg['game'])
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
    curr_player_mana_regen: @player.mana_regen_rate,
    curr_player_stamina_regen: @player.stamina_regen_rate,
    curr_player_gold_regen: @player.gold_regen_rate,
    opp_mana_regen: @opponent ? @opponent.mana_regen_rate : '',
    opp_stamina_regen: @opponent ? @opponent.stamina_regen_rate : '',
    opp_gold_regen: @opponent ? @opponent.gold_regen_rate : '',
    last_played_card: @game.show_last_card_played
  }
  io.push :reload, @total_data.to_json, :to => client.session
end
