class CreateGripeTexts < ActiveRecord::Migration
  def change
    create_table :gripe_texts do |t|
      t.references :gripe

      t.timestamps
    end
    add_index :gripe_texts, :gripe_id
  end
end
