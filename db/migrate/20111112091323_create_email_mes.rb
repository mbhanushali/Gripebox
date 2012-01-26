class CreateEmailMes < ActiveRecord::Migration
  def change
    create_table :email_mes do |t|
      t.references :user
      t.boolean :update_comments
      t.boolean :update_subscriptions
      t.boolean :get_top_gripes_a_week

      t.timestamps
    end
    add_index :email_mes, :user_id
  end
end
