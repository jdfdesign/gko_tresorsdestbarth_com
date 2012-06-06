class GkoImagesCreate < ActiveRecord::Migration
  def self.up
    create_table :images, :force => true do |t|
      t.string :title, :limit => 100
      t.string :alt
      t.references :account
      t.references :author
      t.references :site
      t.integer :image_assignments_count, :default => 0
      t.timestamps

      t.string :image_mime_type
      t.string :image_name
      t.integer :image_size
      t.integer :image_width
      t.integer :image_height
      t.string :image_uid
      t.string :image_ext
    end
    
    add_index :images, :account_id
    add_index :images, :author_id
    add_index :images, :site_id

    create_table :image_assignments, :force => true do |t|
      t.integer :position, :null => false, :default => 1
      t.integer :image_id, :null => false
      t.integer :attachable_id, :null => false
      t.string :attachable_type, :null => false, :limit => 40
      t.timestamps
    end

    add_index :image_assignments, [:attachable_id, :attachable_type]
    add_index :image_assignments, [:image_id]
  end

  def self.down
    drop_table :images
    drop_table :image_assignments
  end
end
