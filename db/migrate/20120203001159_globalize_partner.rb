class GlobalizePartner < ActiveRecord::Migration
    def self.up
      Partner.create_translation_table!({
        :body => :text
      }, {:migrate_data => true})
    end


    def self.down
      Partner.drop_translation_table! :migrate_data => true
    end
  end
