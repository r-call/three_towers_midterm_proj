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
  def show_cards
    hand = []
    #name, desc, url, type, mana_cost
    # gold_cost, stamina_cost (positive values)
    HeldCard.where(player_id: params[:id]).each do |card|  
      hand << card_hash(card)
    end
  end

  def random_card_num
    rand(1..Card.count)
  end

  def find_opp(game)   
    if game.player_1 == self    
      game.player_2   
    else    
      game.player_1   
    end   
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


  end  
end 
