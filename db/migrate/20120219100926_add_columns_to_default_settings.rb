class AddColumnsToDefaultSettings < ActiveRecord::Migration
  def change
    add_column :default_settings, :ads_code1, :text
    add_column :default_settings, :ads_code2, :text
    add_column :default_settings, :ads_code3, :text
    add_column :default_settings, :ads_code4, :text
    add_column :default_settings, :ads_code5, :text
    add_column :default_settings, :script1, :text
    add_column :default_settings, :script2, :text
    add_column :default_settings, :script3, :text
    add_column :default_settings, :script4, :text
    add_column :default_settings, :script5, :text
  end
end
