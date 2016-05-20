class HeldCard < ActiveRecord::Base
  belongs_to :player
  belongs_to :card
  belongs_to :game

  def initialize (card)
    super()
    card_id = card
  end
end 