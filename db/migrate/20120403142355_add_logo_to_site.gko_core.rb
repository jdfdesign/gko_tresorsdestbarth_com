# This migration comes from gko_core (originally 20120403000000)
class AddLogoToSite < ActiveRecord::Migration
  def up
    add_column :sites, :logo_mime_type, :string
    add_column :sites, :logo_name, :string
    add_column :sites, :logo_size, :integer
    add_column :sites, :logo_width, :integer
    add_column :sites, :logo_height, :integer
    add_column :sites, :logo_uid, :string
    add_column :sites, :logo_ext, :string 
  end
  
  def down
    remove_column :sites, :logo_mime_type
    remove_column :sites, :logo_name
    remove_column :sites, :logo_size
    remove_column :sites, :logo_width
    remove_column :sites, :logo_height
    remove_column :sites, :logo_uid
    remove_column :sites, :logo_ext
  end
end