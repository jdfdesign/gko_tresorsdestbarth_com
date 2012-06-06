class GkoStickersCreateTables < ActiveRecord::Migration
  def self.up
    create_table :stickers do |t|
      t.string :name
      t.references :site
      t.references :section
      t.timestamps
    end
    add_index :stickers, :name
    add_index :stickers, [:site_id, :section_id]
    
    create_table :stickings do |t|
      t.integer :sticker_id
      t.integer :stickable_id
      t.string :stickable_type
      t.timestamps
    end
    
    add_index :stickings, [:stickable_id, :stickable_type]
    add_index :stickings, :sticker_id
  end

  def self.down
    drop_table :stickings
    drop_table :stickers
  end
end