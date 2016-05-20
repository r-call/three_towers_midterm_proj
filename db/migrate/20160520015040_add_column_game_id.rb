class AddColumnGameId < ActiveRecord::Migration
  def change
    add_reference :held_cards, :game, index: true
  end
end
