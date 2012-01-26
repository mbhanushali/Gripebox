class AddCommCountToGripes < ActiveRecord::Migration
  def change
    add_column :gripes, :comm_count, :integer, :null => false, :default => 0
  end
end
