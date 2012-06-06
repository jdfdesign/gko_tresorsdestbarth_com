class GkoCategoryGlobalize < ActiveRecord::Migration
  def self.up
    Category.create_translation_table!({
                                           :title => :string,
                                           :body => :text,
                                           :meta_title => :string,
                                           :meta_description => :text,
                                           :meta_keywords => :text,
                                           :slug => :string,
                                           :path => :string
                                       }, {:migrate_data => true})
  end

  def self.down
    Category.drop_translation_table! :migrate_data => true
  end
end

