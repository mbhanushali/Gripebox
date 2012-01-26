class AddGbToMsgs < ActiveRecord::Migration
  def change
    add_column :msgs, :gb, :string
  end
end
