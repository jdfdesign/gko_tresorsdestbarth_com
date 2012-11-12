# This migration comes from gko_core (originally 20120822134000)
class RemoveLocalesFromSitesTable < ActiveRecord::Migration
  def up
    remove_column :sites, :locales if column_exists?(:sites, :locales)
  end

  def down
    add_column :sites, :locales, :string
  end
end