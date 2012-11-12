# This migration comes from gko_core (originally 20121009125400)
class RemoveLockedFromPages < ActiveRecord::Migration
  def up
    remove_column :sections, :locked
    remove_column :sections, :locked_by
  end

  def down
    add_column :sections, :locked, :boolean
    add_column :sections, :locked_by, :integer
  end
end