class AddPlayers < ActiveRecord::Migration
  def change
      create_table :players do |t|
      t.integer :castle, default: 100
      t.integer :shield, default: 25
      t.integer :stamina, default: 10
      t.integer :mana, default: 10
      t.integer :gold, default: 10
      t.integer :stamina_regen_rate, default:  3
      t.integer :mana_regen_rate, default: 3
      t.integer :gold_regen_rate, default: 3
      t.string :last_card_played
      t.timestamps
    end
  end
end
