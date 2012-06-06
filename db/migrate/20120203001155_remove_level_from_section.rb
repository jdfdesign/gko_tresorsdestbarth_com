class RemoveLevelFromSection < ActiveRecord::Migration
  def self.up
    remove_column :sections, :level
  end

  def self.down
    add_column :sections, :level, :integer
  end
end
