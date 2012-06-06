class AddCounterCacheToImage < ActiveRecord::Migration
  def self.up
    Image.reset_column_information
    Image.find_each do |u|
      Image.reset_counters u.id, :image_assignments
    end
  end  

  def self.down
  end
end