class CreateFacebookActivities < ActiveRecord::Migration
  def change
    create_table :facebook_activities do |t|
      t.references :user
      t.boolean :gripe
      t.boolean :amp
      t.string :access_token

      t.timestamps
    end
    add_index :facebook_activities, :user_id
  end
end
