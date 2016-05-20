class Game < ActiveRecord::Base
  belongs_to :player_1, class_name: "Player"
  belongs_to :player_2, class_name: "Player"
  has_many :held_cards

  def player_1
    Player.find_by(player_1_id)
  end

  def player_2
    Player.find_by(player_2_id)
  end

  def game_action(move, player_id, card_num)
    #card_num = 1..5
    player = Player.find(player_id)
    card = Card.find(card_num)

    case move
    when "play"
      #perform card action, discard card, create new card
      player.play_card(card, id)
      player.destroy_card(card_num, id)
      player.generate_card(id)
    when "discard"
      #discard card, create new card
      player.destroy_card(card_num, id)
      player.generate_card(id)
    when "pass"
      #do nothing
    end
  end
end
