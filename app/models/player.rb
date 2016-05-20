require 'pry'
class Player < ActiveRecord::Base
  has_many :cards
  has_many :held_cards, through: :cards
  has_many :games

  def find_opp(game_id)
    game = Game.find(game_id)
    if game.player_1.id == self.id
      binding.pry
      game.player_2
      binding.pry
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



  def generate_hand(game_id)
    5.times { generate_card(game_id) }
  end

  def generate_card(game_id)
    HeldCard.create(card_id: random_card_num, player_id: id, game_id: game_id)
  end

  # unfinished
  def show_cards(game_id)
    hand = []
    #name, desc, url, type, mana_cost
    # gold_cost, stamina_cost (positive values)
    HeldCard.where(player_id: id, game_id: game_id).each do |card|
      hand << card_hash(card)
    end
    hand
  end

  def random_card_num
    rand(1..Card.count)
  end

  def card_hash(card)
    name = card.card.name
    desc = card.card.description
    url = card.card.image_url
    type = card.card.card_type
    mana_cost = card.card.mana_cost * -1
    gold_cost = card.card.gold_cost * -1
    stamina_cost = card.card.stamina_cost * -1

    hash = {:name => name,
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
