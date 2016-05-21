
module Helpers

  def resources_available?(player, card)
    player.mana >= card.card.mana_cost && 
    player.gold >= card.card.gold_cost && 
    player.stamina >= card.card.stamina_cost
  end

  def win_condition(pl,opp)
    if pl.castle <= 0
      return opp.id
    elsif opp.castle <= 0
      return pl.id
    else
      return nil
    end      
  end
  
end
