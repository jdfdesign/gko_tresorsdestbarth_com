# This migration comes from gko_core (originally 20120523111111)
class AddMissingImageToSite < ActiveRecord::Migration
  def up
    add_column :sites, :default_image_uid, :string 
  end
  
  def down
    remove_column :sites, :default_image_uid
  end
end