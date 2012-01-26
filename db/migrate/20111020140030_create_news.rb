class CreateNews < ActiveRecord::Migration
  def change
    create_table :news do |t|
      t.string :title
      t.text :overview
      t.text :embed

      t.timestamps
    end
  end
end
