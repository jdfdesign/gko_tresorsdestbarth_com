# This migration comes from gko_images (originally 20120807163600)
class RemoveUnusedAttributesFromImage < ActiveRecord::Migration
  def up
    drop_table :image_translations if table_exists?(:image_translations)
    remove_column :images, :title
    remove_column :images, :alt
    remove_column :images, :image_ext
  end
  
  def down
    add_column :images, :title, :string
    add_column :images, :alt, :string
    add_column :images, :image_ext, :string
  end
end

