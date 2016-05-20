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

  # def game_action(move, player_id, card_id)
  #   player = Player.find(player_id)
  #   card = Card.find(card_id)

  #   case move
  #   when "play"
  #     player.play_card(card, id)

  #   when "discard"
  #   when "pass"
  #   end
  # end
end
