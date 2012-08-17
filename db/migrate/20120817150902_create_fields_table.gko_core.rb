# This migration comes from gko_core (originally 20120812065700)
class CreateFieldsTable < ActiveRecord::Migration
  def up
    create_table :field_types do |t|
      t.string  :name
      t.string  :presentation
      t.string  :value_type
      t.references :site
      t.string  :class_name
      t.timestamps
    end

    add_index :field_types, :name
    add_index :field_types, [:site_id, :class_name]
    
    create_table :field_values do |t|
      t.references :field_type
      t.references :customizable, :polymorphic => true
      t.text  :body
      t.timestamps
    end

    add_index :field_values, :field_type_id
    add_index :field_values, [:customizable_id, :customizable_type]
  end
  
  def down
    drop_table :field_types
    drop_table :field_values
  end
end
