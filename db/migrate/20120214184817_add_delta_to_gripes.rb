class AddDeltaToGripes < ActiveRecord::Migration
  def change
    add_column :gripes, :delta, :boolean, :default => true, :null => false
  end
end
