class AddContentToGripeTexts < ActiveRecord::Migration
  def change
    add_column :gripe_texts, :content, :string
  end
end
