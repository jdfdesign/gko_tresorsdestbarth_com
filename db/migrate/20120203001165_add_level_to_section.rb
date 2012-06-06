class AddLevelToSection < ActiveRecord::Migration
  def self.up
    unless column_exists?(:sections, :level)
      add_column :sections, :level, :integer
    end
  end

  def self.down
    if column_exists?(:sections, :level)
      remove_column :sections, :level
    end
  end
end