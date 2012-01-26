class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.string :title
      t.string :status
      t.string :label
      t.references :user

      t.timestamps
    end
    add_index :notifications, :user_id
  end
end
