class Game < ActiveRecord::Base
  belongs_to :player_1, class_name: "Player"
  belongs_to :player_2, class_name: "Player"
  has_many :held_cards

  include Helpers

  def player_1
    Player.find_by_id(player_1_id)
  end

  def player_2
    Player.find_by_id(player_2_id)
  end

  def game_action(move, player_id, card_num)

    #card_num = 1..5
    player = Player.find(player_id)
    hand = player.hand(id)
    card = nil
    if card_num
      card = hand[card_num - 1].card
    end
    opp = player.find_opp(id)


    case move
    when "play"
      if resources_available?(player,card)
        player.play_card(card, id)
        update(last_card_played_id: card.id)
        hp_setter(player_1, player_2)
        player.destroy_card(card_num, id)
        player.generate_card(id)
        turn_tracker
        opp.regen_resources
      end
    when "discard"
      player.destroy_card(card_num, id)
      player.generate_card(id)
      turn_tracker
      opp.regen_resources
    when "pass"
      turn_tracker
      opp.regen_resources
    end

    if win_condition(player_1, player_2)
      if player_2.castle <= 0
        self.winner_id = player_1.id
        self.loser_id = player_2.id
        save
      elsif player_1.castle <= 0
        self.winner_id = player_2.id
        self.loser_id = player_1.id
        save
      end
    end
  end

  def turn_tracker
    a = player_1
    b = player_2

    if last_turn_player_id == a.id
      self.last_turn_player_id = b.id
      save
    else
      self.last_turn_player_id = a.id
      save
    end
  end

  def first_player_setter
    if last_turn_player_id == nil
      self.last_turn_player_id = randomize_first_turn_player
      save
    end
  end

  def show_last_card_played
    if last_card_played_id.nil?
      nil
    else
      card = Card.find(last_card_played_id)

      id = card.id
      name = card.name
      desc = card.description
      url = card.image_url
      type = card.card_type
      mana_cost = card.mana_cost * -1
      gold_cost = card.gold_cost * -1
      stamina_cost = card.stamina_cost * -1

      hash = {
        :id => id,
        :name => name,
        :description => desc,
        :image_url => url,
        :card_type => type,
        :mana_cost => mana_cost,
        :gold_cost => gold_cost,
        :stamina_cost => stamina_cost
      }
    end
  end

  def randomize_first_turn_player
    a = player_1
    b = player_2
    if a && b
      num = rand(1..50)
      num > 25 ? a.id : b.id
    end
  end

  def end_game
    self.destroy
  end

  def held_hand_destroy(p1, p2)
    HeldCard.where(player_id: p1.id).destroy_all
    HeldCard.where(player_id: p2.id).destroy_all
  end

  def delete_players
    Player.delete(player_1.id)
    Player.delete(player_2.id)
  end

  def hp_setter(player_1, player_2)
    player_1.castle = 0 if player_1.castle < 0
    player_1.castle = 100 if player_1.castle >100
    player_1.shield = 0 if player_1.shield < 0
    player_1.shield = 25 if player_1.shield > 25
    player_2.castle = 0 if player_2.castle < 0
    player_2.castle = 100 if player_2.castle > 100
    player_2.shield = 0 if player_2.shield < 0
    player_2.shield = 25 if player_2.shield >25
    if player_1.mana < 0
      player_1.mana = 0
    end
    if player_1.stamina < 0
      player_1.stamina = 0
    end
    if player_1.gold < 0
      player_1.gold = 0
    end
    if player_2.mana < 0
      player_2.mana = 0
    end
    if player_2.stamina < 0
      player_2.stamina = 0
    end
    if player_2.gold < 0
      player_2.gold = 0
    end
    player_1.save
    player_2.save
  end

  def current_player_id
   last_turn_player_id == player_1_id ? player_2_id : player_1_id
  end
end
