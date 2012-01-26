class AddCreateAGripeColumnToAuthentications < ActiveRecord::Migration
  def change
    add_column :authentications, :create_a_gripe, :boolean
    add_column :authentications, :amp_up, :boolean
  end
end
