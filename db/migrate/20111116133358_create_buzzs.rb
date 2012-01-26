class CreateBuzzs < ActiveRecord::Migration
  def change
    create_table :buzzs do |t|
      t.string :tag
      t.integer :count, :default => 0
      t.string :period
      t.boolean :published, :default => true

      t.timestamps
    end
  end
end
