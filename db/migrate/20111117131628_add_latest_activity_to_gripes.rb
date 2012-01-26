class AddLatestActivityToGripes < ActiveRecord::Migration
  def change
    add_column :gripes, :latest_activity, :timestamp
  end
end
