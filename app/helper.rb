
module Helpers

  def resources_available?(player, card)
    player.mana >= card.mana_cost * -1 && 
    player.gold >= card.gold_cost * -1 && 
    player.stamina >= card.stamina_cost * -1
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
