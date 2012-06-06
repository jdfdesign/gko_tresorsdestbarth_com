class GkoStickersTranslate < ActiveRecord::Migration
  def self.up
      Sticker.create_translation_table!({
        :name => :string
      }, {:migrate_data => true})
  end

  def self.down
    Sticker.drop_translation_table! :migrate_data => true
  end
end