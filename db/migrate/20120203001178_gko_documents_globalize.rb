class GkoDocumentsGlobalize < ActiveRecord::Migration
  def self.up
    Document.create_translation_table!({
      :title => :string,
      :alt => :text
    }, {:migrate_data => true})
  end

  
  def self.down
    Document.drop_translation_table! :migrate_data => true
  end
end
