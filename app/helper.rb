
module Helpers

  def resources_available?(player, card)
    player.mana >= card.card.mana_cost && 
    player.gold >= card.card.gold_cost && 
    player.stamina >= card.card.stamina_cost
  end

  def win_condition?(opponent)
    opponent.castle == 0
  end
  
end
