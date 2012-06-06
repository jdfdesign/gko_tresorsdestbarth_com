# This migration comes from gko_core (originally 20120326000000)
class AddLocalhostToSite < ActiveRecord::Migration
  def up
    add_column :sites, :localhost, :string
  end
  
  def down
    remove_column :sites, :localhost
  end
end