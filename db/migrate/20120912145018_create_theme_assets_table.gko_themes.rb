# This migration comes from gko_themes (originally 20120824181400)
class CreateThemeAssetsTable < ActiveRecord::Migration
  def up

    create_table :theme_assets do |t|
      t.references :theme
      t.string :content_type
      t.integer :width
      t.integer :height
      t.integer :size
      t.string :source
      t.string :local_path
      t.string :folder
      t.boolean :compile, :default => false
      t.timestamps
    end

    add_index :theme_assets, [:theme_id]
    add_index :theme_assets, [:local_path]
  end
  
  def down
    remove_index :theme_assets, [:theme_id]
    remove_index :theme_assets, [:local_path]
    drop_table :theme_assets
  end
  
end
