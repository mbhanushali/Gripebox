class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.references :gripe
      t.string :what

      t.timestamps
    end
    add_index :activities, :gripe_id
  end
end
