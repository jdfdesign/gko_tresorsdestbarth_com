class RemoveDynamicFile < ActiveRecord::Migration
  def self.up
    remove_index :dynamic_files, :name
    remove_index :dynamic_files, :site_id
    drop_table :dynamic_files
     
  end

  def self.down
    
  end
end