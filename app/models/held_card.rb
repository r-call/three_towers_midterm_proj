class HeldCard < ActiveRecord::Base
  belongs_to :player
  belongs_to :card
  belongs_to :game

end 