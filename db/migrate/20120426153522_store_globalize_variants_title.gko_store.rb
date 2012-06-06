# This migration comes from gko_store (originally 20120422000000)
class StoreGlobalizeVariantsTitle < ActiveRecord::Migration
  def self.up
   Variant.create_translation_table!({ 
     :alt_title => :string
     }, {:migrate_data => true})

  end

  def self.down
    Variant.drop_translation_table! :alt_title => true
  end
end