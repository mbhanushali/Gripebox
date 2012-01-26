class AddDurationToFileUploads < ActiveRecord::Migration
  def change
    add_column :file_uploads, :duration, :string
  end
end
