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
    card = hand[card_num - 1].card
    opp = player.find_opp(id)

    if resources_available?(player,card)
      turn_tracker
    end

    case move
    when "play"
      if resources_available?(player,card)
        player.play_card(card, id)
        hp_setter(player_1, player_2)
        player.destroy_card(card_num, id)
        player.generate_card(id)
        opp.regen_resources
      end
    when "discard"
      player.destroy_card(card_num, id)
      player.generate_card(id)
      opp.regen_resources
    when "pass"
      opp.regen_resources
    end

    if win_condition(player_1, player_2)
      held_hand_destroy(player_1, player_2)
      delete_players
      end_game
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
    player_1.shield = 50 if player_1.shield > 50
    player_2.castle = 0 if player_2.castle < 0
    player_2.castle = 100 if player_2.castle > 100
    player_2.shield = 0 if player_2.shield < 0
    player_2.shield = 50 if player_2.shield >50
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
