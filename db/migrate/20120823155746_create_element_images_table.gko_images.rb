# This migration comes from gko_images (originally 20120822135100)
class CreateElementImagesTable < ActiveRecord::Migration
  def up
    create_table :element_images, :id => false do |t|
      t.references :site
      t.references :section
      t.references :image
      t.string :title
      t.string :caption
      t.string :link
      t.string :link_target
      t.timestamps
    end
    add_index :element_images, [:image_id]
    add_index :element_images, [:site_id]
    add_index :element_images, [:section_id]
  end

  def down
    remove_index :element_images, [:image_id]
    remove_index :element_images, [:site_id]
    remove_index :element_images, [:section_id]
    drop_table :element_images
  end
end


