# This migration comes from gko_core (originally 20120822184400)
class CreateElementTextsTable < ActiveRecord::Migration
  def up

    create_table :element_texts do |t|
      t.timestamps
    end

    create_table :element_text_translations do |t|
      t.references :element_text
      t.string :locale
      t.text  :body
      t.text  :body_plain
      t.timestamps
    end
    add_index :element_text_translations, [:element_text_id]
    
    create_table :element_assignments do |t|
      t.integer :position, :null => false, :default => 1
      t.references :content, :null => false
      t.integer :attachable_id, :null => false
      t.string :attachable_type, :null => false, :limit => 40
      t.timestamps
    end
    
    add_index :element_assignments, [:content_id]
    add_index :element_assignments, [:attachable_id, :attachable_type]
  end
  
  def down
    remove_index :element_assignments, [:content_id]
    remove_index :element_assignments, [:attachable_id, :attachable_type]
    drop_table :element_texts
    drop_table :element_assignments
    remove_index :element_text_translations, [:element_text_id]
    drop_table :element_text_translations
  end
  
end