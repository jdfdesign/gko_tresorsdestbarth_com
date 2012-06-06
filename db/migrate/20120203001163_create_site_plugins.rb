class CreateSitePlugins < ActiveRecord::Migration
  def self.up
    add_column :sites, :plugins, :text
  end

  def self.down
    remove_column :sites, :plugins
  end
end