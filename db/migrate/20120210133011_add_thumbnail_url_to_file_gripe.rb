class AddThumbnailUrlToFileGripe < ActiveRecord::Migration
  def change
    add_column :file_gripes, :thumbnail_url, :text
  end
end
