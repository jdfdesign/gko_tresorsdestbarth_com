# This migration comes from gko_core (originally 20120822175000)
class AddRobotIndexToSections < ActiveRecord::Migration
  def up
    add_column :sections, :robot_index, :boolean, :default => true unless column_exists?(:sections, :robot_index)
    remove_column :sections, :no_follow if column_exists?(:sections, :no_follow)
    add_column :sections, :robot_follow, :boolean, :default => true unless column_exists?(:sections, :robot_follow)
    add_column :sections, :locked, :boolean, :default => false unless column_exists?(:sections, :locked)
    add_column :sections, :locked_by, :integer unless column_exists?(:sections, :locked_by)
    remove_column :sections, :level if column_exists?(:sections, :level)
    add_index :sections, [:parent_id, :lft]
  end

  def down
    remove_column :sections, :robot_index if column_exists?(:sections, :robot_index)
    remove_column :sections, :robot_follow if column_exists?(:sections, :robot_follow)
    remove_column :sections, :locked_by if column_exists?(:sections, :locked_by)
    remove_column :sections, :locked if column_exists?(:sections, :locked)
    remove_index :sections, [:parent_id, :lft]
    
    
  end
end