class CreateImageStickers < ActiveRecord::Migration
  def self.up
    create_table :image_stickers do |t|
      t.string :name
      t.references :site
      t.timestamps
    end
    add_index :image_stickers, :name
    add_index :image_stickers, :site_id
    
    create_table :image_stickings do |t|
      t.integer :sticker_id
      t.integer :image_id
      t.integer :image_stickings_count, :default => 0
      t.timestamps
    end
    
    add_index :image_stickings, [:sticker_id, :image_id]

    create_table :image_folders, :force => true do |t| 
      t.string :name 
      t.references :site
      t.references :parent 
      t.integer :lft
      t.integer :rgt
      t.integer :level
      t.timestamps
    end
    
    add_index :image_folders, :site_id
    add_index :image_folders, :parent_id
    
    add_column :images, :image_folder_id, :integer
    add_index :images, [:image_folder_id] 
    
  end

  def self.down
    drop_table :image_stickings
    drop_table :image_stickers
    drop_table :image_folders 
    remove_column :images, :image_folder_id, :integer
    remove_index :images, [:image_folder_id]
  end
end