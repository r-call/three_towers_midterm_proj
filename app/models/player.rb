class Player < ActiveRecord::Base
  has_many :cards
  has_many :held_cards, through: :cards
  has_many :games

  @turn = Game.player_1

  def generate_hand
    5.times { generate_card }
  end

  def generate_card
    HeldCard.new(random_card_num)
  end
  
  # unfinished
  def show_cards(game_id)
    hand = []
    #name, desc, url, type, mana_cost
    # gold_cost, stamina_cost (positive values)
    HeldCard.where(player_id: params[:id], game_id: game_id).each do |card|  
      hand << card_hash(card)
    end
    hand
  end

  def random_card_num
    rand(1..Card.count)
  end

  def card_hash(card)
    name = card.name
    desc = card.description
    url = card.image_url
    type = card.card_type
    mana_cost *= card.mana_cost * -1
    gold_cost *= card.gold_cost * -1
    stamina_cost *= card.stamina_cost * -1

    hash = {}
    hash << {:name => name, 
      :description => desc, 
      :image_url => url,
      :card_type => type, 
      :mana_cost => mana_cost, 
      :gold_cost => gold_cost,
      :stamina_cost => stamina_cost}
  end

  def play_card(card, game_id)
    #needs game_id
    opponent = find_opp(game_id)

    castle += card.card.own_castle.to_i
    shield += card.card.own_shield.to_i
    stamina += card.card.own_stamina.to_i
    mana += card.card.own_mana.to_i
    gold += card.card.own_gold.to_i
    stamina_regen_rate += card.card.own_stamina_rate.to_i
    mana_regen_rate += card.card.own_mana_rate.to_i
    gold_regen_rate += card.card.own_gold_rate.to_i
    stamina += card.card.stamina_cost.to_i
    mana += card.card.mana_cost.to_i
    gold += card.card.gold_cost.to_i
    opponent.castle += card.card.opp_castle.to_i
    opponent.shield += card.card.opp_shield.to_i
    opponent.stamina_regen_rate += card.card.opp_stamina_rate.to_i
    opponent.mana_regen_rate += card.card.opp_mana_rate.to_i
    opponent.gold_regen_rate += card.card.opp_gold_rate.to_i
    opponent.stamina += card.card.opp_stamina.to_i
    opponent.mana += card.card.opp_mana.to_i
    opponent.gold += card.card.opp_gold.to_i
  end

  end  
end 
