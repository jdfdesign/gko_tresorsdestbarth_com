# This migration comes from gko_core (originally 20120310222222)
class AddShallowPermalinkToSection < ActiveRecord::Migration
  def change
    add_column :sections, :shallow_permalink, :boolean, :default => true  unless column_exists?(:sections, :shallow_permalink) 
  end
end