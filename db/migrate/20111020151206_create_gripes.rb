class CreateGripes < ActiveRecord::Migration
  def change
    create_table :gripes do |t|
      t.string :title
      t.text :overview
      t.references :user

      t.timestamps
    end
    add_index :gripes, :user_id
  end
end
