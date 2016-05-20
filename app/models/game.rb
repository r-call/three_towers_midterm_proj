class Game < ActiveRecord::Base
  belongs_to :player_1, class_name: "Player"
  belongs_to :player_2, class_name: "Player"
  has_many :held_cards

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