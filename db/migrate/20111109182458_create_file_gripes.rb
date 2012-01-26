class CreateFileGripes < ActiveRecord::Migration
  def change
    create_table :file_gripes do |t|
      t.references :file_upload
      t.references :gripe
      t.text :overview
      t.string :mimetype

      t.timestamps
    end
    add_index :file_gripes, :file_upload_id
    add_index :file_gripes, :gripe_id
  end
end
