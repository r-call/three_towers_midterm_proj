
module Helpers

  def resources_available?(player, card)
    player.mana >= card.card.mana_cost && 
    player.gold >= card.card.gold_cost && 
    player.stamina >= card.card.stamina_cost
  end

  def game_action(player, opponent, card)
    player.castle += card.card.own_castle.to_i
    player.shield += card.card.own_shield.to_i
    player.stamina += card.card.own_stamina.to_i
    player.mana += card.card.own_mana.to_i
    player.gold += card.card.own_gold.to_i
    player.stamina_regen_rate += card.card.own_stamina_rate.to_i
    player.mana_regen_rate += card.card.own_mana_rate.to_i
    player.gold_regen_rate += card.card.own_gold_rate.to_i
    player.stamina += card.card.stamina_cost.to_i
    player.mana += card.card.mana_cost.to_i
    player.gold += card.card.gold_cost.to_i
    opponent.castle += card.card.opp_castle.to_i
    opponent.shield += card.card.opp_shield.to_i
    opponent.stamina_regen_rate += card.card.opp_stamina_rate.to_i
    opponent.mana_regen_rate += card.card.opp_mana_rate.to_i
    opponent.gold_regen_rate += card.card.opp_gold_rate.to_i
    opponent.stamina += card.card.opp_stamina.to_i
    opponent.mana += card.card.opp_mana.to_i
    opponent.gold += card.card.opp_gold.to_i
  end

  def turn_player(player1, player2)
    
  end

  def win_condition(opponent)
    opponent.castle == 0
  end
  
end
