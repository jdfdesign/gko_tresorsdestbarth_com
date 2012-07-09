# This migration comes from gko_images (originally 20120708000000)
class CreateImageFolderJoinTable < ActiveRecord::Migration
  def up
    remove_index :image_stickers, :name
    remove_index :image_stickings, [:sticker_id, :image_id]
    drop_table :image_stickers
    drop_table :image_stickings
    
    create_table :image_folders_images, :id => false do |t|
      t.references :image_folder
      t.references :image
      t.timestamps
    end
    add_index :image_folders_images, [:image_folder_id, :image_id]
    add_index :image_folders_images, [:image_id, :image_folder_id]
  end

  def down
    remove_index :image_folders_images, [:image_folder_id, :image_id]
    remove_index :image_folders_images, [:image_id, :image_folder_id]
    drop_table :image_folder_image
  end
end
