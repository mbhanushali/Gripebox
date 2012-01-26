class AddProfileColumnsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :birthday, :date
    add_column :users, :gender, :string
    add_column :users, :occupation, :string
    add_column :users, :location, :string
  end
end
