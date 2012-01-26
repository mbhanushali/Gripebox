class AddSourceColumnsToFileUploads < ActiveRecord::Migration
  def self.up
    add_column :file_uploads, :source_file_name,    :string
    add_column :file_uploads, :source_content_type, :string
    add_column :file_uploads, :source_file_size,    :integer
    add_column :file_uploads, :source_updated_at,   :datetime
  end

  def self.down
    remove_column :file_uploads, :source_file_name
    remove_column :file_uploads, :source_content_type
    remove_column :file_uploads, :source_file_size
    remove_column :file_uploads, :source_updated_at
  end
end
