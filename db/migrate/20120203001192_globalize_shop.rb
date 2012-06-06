class GlobalizeShop < ActiveRecord::Migration
  def self.up
    Product.create_translation_table!({
      :title => :string, 
      :body => :text,
      :slug => :string,
      :meta_description => :string,
      :meta_keywords => :string,
      :meta_title => :string
      }, {:migrate_data => true})
      
   Property.create_translation_table!({ 
     :presentation => :string
     }, {:migrate_data => true})

  end

  def self.down
    Property.drop_translation_table! :migrate_data => true
    Product.drop_translation_table! :migrate_data => true
  end
end