# This migration comes from gko_core (originally 20120921090800)
class AddPageTypesToSite < ActiveRecord::Migration
  def up
    add_column :sites, :page_types, :text
  end

  def down
    remove_column :sites, :page_types
  end
end