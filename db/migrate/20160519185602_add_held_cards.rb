class AddHeldCards < ActiveRecord::Migration
  def change
    create_table :held_cards do |t|
      t.references :card
      t.references :player
      t.timestamps
    end
  end
end
