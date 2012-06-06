class AddImageSizesToSite < ActiveRecord::Migration
  def self.up
    add_column :sites, :image_sizes, :string, :default => '110x110>,225x255>,450x450>'
  end

  def self.down
    remove_column :sites, :image_sizes
  end
end
