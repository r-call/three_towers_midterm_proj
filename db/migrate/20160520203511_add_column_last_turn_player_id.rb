class AddColumnLastTurnPlayerId < ActiveRecord::Migration
  def change
    add_column :games, :last_turn_player_id, :integer
  end
end
