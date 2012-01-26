class AddPowerToGripes < ActiveRecord::Migration
  def change
    add_column :gripes, :power, :integer, :default => 0
  end
end
