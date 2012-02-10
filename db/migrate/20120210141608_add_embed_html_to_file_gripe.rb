class AddEmbedHtmlToFileGripe < ActiveRecord::Migration
  def change
    add_column :file_gripes, :embed_html, :text
  end
end
