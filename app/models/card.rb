class Card < ActiveRecord::Base
  has_many :held_cards
end 