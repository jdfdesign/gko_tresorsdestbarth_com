# This migration comes from gko_core (originally 20120505000000)
class AddNofollowToSection < ActiveRecord::Migration
  def up
    add_column :sections, :no_follow, :boolean unless column_exists?(:sections, :no_follow) 
  end
  
  def down
    remove_column :sections, :no_follow if column_exists?(:sections, :no_follow) 
  end
end