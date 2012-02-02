class CreateDefaultSettings < ActiveRecord::Migration
  def change
    create_table :default_settings do |t|
      t.string :page_title
      t.string :meta_description
      t.string :meta_keywords
      t.string :background_color

      t.timestamps
    end
  end
end
