class AddLastCardPlayedToGames < ActiveRecord::Migration
  def change
    add_column :games, :last_card_played_id, :integer
  end
end
