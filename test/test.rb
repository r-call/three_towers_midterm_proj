require_relative '../config/environment'
include Helpers
require 'pry'

player1 = Player.new
player2 = Player.new
game = Game.new(player_1_id: player1.id, player_2_id: player2.id)
card1 = HeldCard.new(card_id: 1, player_id: 1)
card2 = HeldCard.new(card_id: 2, player_id: 1)
card3 = HeldCard.new(card_id: 3, player_id: 1)
card4 = HeldCard.new(card_id: 4, player_id: 1)
card5 = HeldCard.new(card_id: 5, player_id: 1)

puts card1.card.description
puts card2.card.description
puts card3.card.description
puts card4.card.description
puts card5.card.description
puts player1.inspect

puts resources_available?(player1, card1)
game_action(player1, player2, card1)
game_action(player2, player1, card4)
game_action(player1, player2, card1)
puts player1.inspect
puts player2.inspect
puts player1.inspect