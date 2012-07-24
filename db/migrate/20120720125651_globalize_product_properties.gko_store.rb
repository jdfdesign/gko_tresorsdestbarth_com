# This migration comes from gko_store (originally 20120716000000)
class GlobalizeProductProperties < ActiveRecord::Migration
  def up
    rename_column :product_properties, :value, :presentation
    ProductProperty.create_translation_table!({ 
      :presentation => :string
      }, {:migrate_data => true})
  end

  def down
    ProductProperty.drop_translation_table! :migrate_data => true
  end
end