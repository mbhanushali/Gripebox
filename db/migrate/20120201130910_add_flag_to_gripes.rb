class AddFlagToGripes < ActiveRecord::Migration
  def change
    add_column :gripes, :is_flag, :boolean, :default => false
  end
end
