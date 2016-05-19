class Player < ActiveRecord::Base
  has_many :held_cards
  has_many :games


  def find_opp
    if Game.player_1 == self
      Game.player_2
    else
      Game.player_1
    end
  end

#Use ActiveRecord .to_hash to get get card. 
#=> returns an array of hashes with result of query
#then pass array of single hash into play_card
  def play_card (card)
  #TODO: check if it is valid to play this card
    opponent = find_opp
    @single_card = card[0]

    @single_card.each_pair do |key,value|
      # opponent = opponent

      case key
        when :own_mana
          mana += value
        when :own_gold
          gold += value
        when :own_stamina
          stamina += value
        when :own_shield
          shield += value
        when :own_castle
          own_castle += value
        when :opp_mana
          opponent.opp_mana += value
        when :opp_gold
          opponent.opp_gold += value
        when :opp_stamina
          opponent.opp_stamina += value
        when :opp_shield
          opponent.opp_shield += value
        when :opp_castle
          opponent.opp_castle += value
        when :mana_cost
          mana += value
        when :gold_cost
          gold += value
        when :stamina_cost
          stamina += value
      end
    end
  end

end 