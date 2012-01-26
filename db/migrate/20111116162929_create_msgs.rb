class CreateMsgs < ActiveRecord::Migration
  def change
    create_table :msgs do |t|
      t.references :activity
      t.boolean :unread, :default => 0
      t.references :user

      t.timestamps
    end
    add_index :msgs, :activity_id
    add_index :msgs, :user_id
  end
end
