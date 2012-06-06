class GlobalizeFeatures < ActiveRecord::Migration
  def self.up
    Feature.create_translation_table!({
      :title => :string,
      :body => :text
    }, {:migrate_data => true})

  end

  def self.down
    Feature.drop_translation_table! :migrate_data => true
  end
end
