class Player < ActiveRecord::Base
  has_many :held_cards
  has_many :games
end 