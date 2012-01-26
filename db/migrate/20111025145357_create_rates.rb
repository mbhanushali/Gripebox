class CreateRates < ActiveRecord::Migration
  def change
    create_table :rates do |t|
      t.references :gripe
      t.integer :value
      t.references :user

      t.timestamps
    end
    add_index :rates, :gripe_id
    add_index :rates, :user_id
  end
end
