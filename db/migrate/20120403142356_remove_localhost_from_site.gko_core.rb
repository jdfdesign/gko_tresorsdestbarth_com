# This migration comes from gko_core (originally 20120403111111)
class RemoveLocalhostFromSite < ActiveRecord::Migration
  def up
    remove_column :sites, :localhost if column_exists?(:sites, :localhost)
  end
  
  def down
    add_column :sites, :localhost, :string unless column_exists?(:sites, :localhost) 
  end
end