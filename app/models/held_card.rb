class HeldCard < ActiveRecord::Base
  belongs_to :player
  belongs_to :card

  def initialize (card)
    super()
    card_id = card
  end
end 