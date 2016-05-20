class Card < ActiveRecord::Base
  has_many :players
  has_many :held_cards, through: :players
end 