class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.string  :title
      t.text    :body
      t.integer :position
      t.timestamps
      t.string :slug
      t.string :custom_title
      t.string :meta_description
      t.string :meta_keywords

    end
    add_index :pages, :slug, unique: true
  end
end
