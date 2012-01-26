class CreateFooterImages < ActiveRecord::Migration
  def change
    create_table :footer_images do |t|
      t.string :title
      t.boolean :display_on

      t.timestamps
    end
  end
end
