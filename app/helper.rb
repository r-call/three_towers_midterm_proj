
module Helpers

  def resources_available?(player, card)
    player.mana >= card.card.mana_cost && 
    player.gold >= card.card.gold_cost && 
    player.stamina >= card.card.stamina_cost
  end

  def find_opp(game_id)   
    game = Game.find(game_id)
    if game.player_1_id == id
      return Player.find(game.player_2_id)
    else
      Player.find(game.player_1_id)
    end
  end

  def win_condition?(opponent)
    opponent.castle == 0
  end
  
end
