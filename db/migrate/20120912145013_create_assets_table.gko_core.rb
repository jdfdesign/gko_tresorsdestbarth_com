# This migration comes from gko_core (originally 20120823145300)
class CreateAssetsTable < ActiveRecord::Migration
  def up

    create_table :assets do |t|
      t.references :site
      t.string :content_type
      t.integer :width
      t.integer :height
      t.integer :size
      t.string :source
      t.string :source_filename
      t.timestamps
    end

    add_index :assets, [:site_id]
  end
  
  def down
    remove_index :assets, [:site_id]
    drop_table :assets
  end
  
end