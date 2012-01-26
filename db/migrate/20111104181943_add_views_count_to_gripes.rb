class AddViewsCountToGripes < ActiveRecord::Migration
  def change
    add_column :gripes, :comments_count, :integer, :null => false, :default => 0
  end
end
