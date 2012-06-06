class GkoImagesGlobalize < ActiveRecord::Migration
  def self.up
    Image.create_translation_table!({
      :title => :string,
      :alt => :text
    }, {:migrate_data => true})
  end

  
  def self.down
    Image.drop_translation_table! :migrate_data => true
  end
end
