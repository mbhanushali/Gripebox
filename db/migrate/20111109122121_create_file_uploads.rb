class CreateFileUploads < ActiveRecord::Migration
  def change
    create_table :file_uploads do |t|
      t.references :user

      t.timestamps
    end
    add_index :file_uploads, :user_id
  end
end
