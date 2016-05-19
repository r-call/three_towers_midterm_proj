class AddCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :name
      t.string :description
      t.string :image_url
      t.string :card_type
      t.integer :own_mana
      t.integer :own_gold
      t.integer :own_stamina
      t.integer :own_shield
      t.integer :own_castle
      t.integer :opp_mana
      t.integer :opp_gold
      t.integer :opp_stamina
      t.integer :opp_shield
      t.integer :opp_castle
      t.integer :mana_cost
      t.integer :gold_cost
      t.integer :stamina_cost
      t.integer :own_mana_rate
      t.integer :own_gold_rate
      t.integer :own_stamina_rate
      t.integer :opp_mana_rate
      t.integer :opp_gold_rate
      t.integer :opp_stamina_rate
      t.string :attr_swap
      t.timestamps
    end
  end
end
