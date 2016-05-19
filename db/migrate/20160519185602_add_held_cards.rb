class AddHeldCards < ActiveRecord::Migration
  def change
    create_table :held_cards do |t|
      t.references :cards
      t.references :players
      t.timestamps
    end
  end
end
