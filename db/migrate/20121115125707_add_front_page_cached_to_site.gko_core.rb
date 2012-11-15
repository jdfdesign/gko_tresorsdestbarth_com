# This migration comes from gko_core (originally 2012111091941)
class AddFrontPageCachedToSite < ActiveRecord::Migration
  def up
    add_column :sites, :front_page_cached, :boolean, :default => false
  end

  def down
    remove_column :sites, :front_page_cached
  end
end