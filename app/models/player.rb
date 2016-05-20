class Player < ActiveRecord::Base
  has_many :cards
  has_many :held_cards, through: :cards
  has_many :games

  def find_opp(game)
    if game.player_1 == self
      game.player_2
    else
      game.player_1
    end
  end

  #Use ActiveRecord .to_hash to get get card.
  #=> returns an array of hashes with result of query
  #then pass array of single hash into play_card
  def play_card (card, game)
    #TODO: check if it is valid to play this card
    opp = find_opp(game)

    card_hash = card_to_hash(card)

    card_hash.each_pair do |key,value|
      binding.pry
      case key
      when "own_mana"
        mana += value
      when "own_gold"
        gold += value
      when "own_stamina"
        stamina += value
      when "own_shield"
        shield += value
      when "own_castle"
        own_castle += value
      when "opp_mana"
        opp.opp_mana += value
      when "opp_gold"
        opp.opp_gold += value
      when "opp_stamina"
        opp.opp_stamina += value
      when "opp_shield"
        opp.opp_shield += value
      when "opp_castle"
        opp.opp_castle += value
      when "mana_cost"
        mana += value
      when "gold_cost"
        gold += value
      when "stamina_cost"
        stamina += value
      end
    end
  end

  def card_to_hash (card)
    c_hash = {}
    card.attributes.each {|k,v| c_hash[k] = v}
  end

  
end
