class AddColumnsToPages < ActiveRecord::Migration
  def change
    add_column :pages, :show_link_in_footer, :boolean, :default => false
    add_column :pages, :make_no_follow, :boolean, :default => false
    add_column :pages, :make_no_index, :boolean, :default => false
  end
end
