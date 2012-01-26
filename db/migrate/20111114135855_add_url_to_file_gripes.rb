class AddUrlToFileGripes < ActiveRecord::Migration
  def change
    add_column :file_gripes, :url, :string
  end
end
