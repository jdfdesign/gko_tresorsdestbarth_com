class RemoveImageSizesToSite < ActiveRecord::Migration
  def self.up
    remove_column :sites, :image_sizes
  end

  def self.down
    add_column :sites, :image_sizes, :string, :default => '110x110>,225x255>,450x450>'
  end
end
