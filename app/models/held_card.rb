class HeldCard < ActiveRecord::Base
  belongs_to :player
  belongs_to :cards
end 