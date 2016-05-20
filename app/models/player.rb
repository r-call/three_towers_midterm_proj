class Player < ActiveRecord::Base
  has_many :cards
  has_many :held_cards, through: :cards
  has_many :games
end 