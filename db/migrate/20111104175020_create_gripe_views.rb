class CreateGripeViews < ActiveRecord::Migration
  def change
    create_table :gripe_views do |t|
      t.references :gripe

      t.timestamps
    end
    add_index :gripe_views, :gripe_id
  end
end
