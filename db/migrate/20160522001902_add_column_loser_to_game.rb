class AddColumnLoserToGame < ActiveRecord::Migration
  def change
    add_column :games, :loser_id, :integer
  end
end
