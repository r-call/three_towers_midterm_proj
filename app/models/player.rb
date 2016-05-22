require 'pry'
class Player < ActiveRecord::Base
  has_many :cards
  has_many :held_cards, through: :cards
  has_many :games

  include Helpers

  def find_opp(game_id)
    game = Game.find(game_id)
    if game.player_1.id == self.id
      game.player_2
    else
      game.player_1
    end
  end

  def destroy_card(card_num, game_id)
    number = hand(game_id)[card_num - 1].id
    HeldCard.destroy(number)
    # hand_cards = show_cards(game_id)
    # h_id = hand_cards[card_num - 1]["id"]
    # HeldCard.destroy(h_id)
  end

  def generate_hand(game_id)
    5.times { generate_card(game_id) }
  end

  def generate_card(game_id)
    HeldCard.create(card_id: random_card_num, player_id: id, game_id: game_id)
  end

  def show_cards(game_id)
    hand = []
    HeldCard.where(player_id: id, game_id: game_id).each do |card|
      hand << card_hash(card)
      hand = hand.sort_by { |k| k["id"] }
    end
    hand
  end

  def random_card_num
    rand(1..Card.count)
  end

  def card_hash(card)
    id = card.card.id
    name = card.card.name
    desc = card.card.description
    url = card.card.image_url
    type = card.card.card_type
    mana_cost = card.card.mana_cost * -1
    gold_cost = card.card.gold_cost * -1
    stamina_cost = card.card.stamina_cost * -1

    hash = {:id => id,
      :name => name,
      :description => desc,
      :image_url => url,
      :card_type => type,
      :mana_cost => mana_cost,
      :gold_cost => gold_cost,
      :stamina_cost => stamina_cost}
  end

  def hand(game_id)
    HeldCard.where(player_id:id,game_id:game_id).order(:id)
  end

  def play_card(card, game_id)
    opponent = find_opp(game_id)
    
    self.castle += card.own_castle.to_i
    self.shield += card.own_shield.to_i
    self.save
    if self.shield < 0
      self.castle += self.shield
    end
    self.stamina += card.own_stamina.to_i
    self.mana += card.own_mana.to_i
    self.gold += card.own_gold.to_i
    self.stamina_regen_rate += card.own_stamina_rate.to_i
    self.mana_regen_rate += card.own_mana_rate.to_i
    self.gold_regen_rate += card.own_gold_rate.to_i
    self.stamina += card.stamina_cost.to_i
    self.mana += card.mana_cost.to_i
    self.gold += card.gold_cost.to_i
    opponent.shield += card.opp_shield.to_i
    opponent.castle += card.opp_castle.to_i
    opponent.save
    if opponent.shield < 0
      opponent.castle += opponent.shield
    end
    opponent.stamina_regen_rate += card.opp_stamina_rate.to_i
    opponent.mana_regen_rate += card.opp_mana_rate.to_i
    opponent.gold_regen_rate += card.opp_gold_rate.to_i
    opponent.stamina += card.opp_stamina.to_i
    opponent.mana += card.opp_mana.to_i
    opponent.gold += card.opp_gold.to_i

    self.save
    opponent.save
    
  end

  def regen_resources
    self.stamina += stamina_regen_rate
    self.mana += mana_regen_rate
    self.gold += gold_regen_rate
    save
  end

end
