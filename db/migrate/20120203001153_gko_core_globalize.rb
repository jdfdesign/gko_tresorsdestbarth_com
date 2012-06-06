class GkoCoreGlobalize < ActiveRecord::Migration
  def self.up

    Site.create_translation_table!({   :meta_title => :string, 
                                       :title => :string,
                                       :subtitle => :string
                                   }, {:migrate_data => true})

    unless column_exists?(:sections, :menu_title)
      add_column :sections, :menu_title, :string
    end                              
    Section.create_translation_table!({
                                          :title => :string,
                                          :body => :text,
                                          :meta_title => :string,
                                          :meta_description => :text,
                                          :meta_keywords => :text,
                                          :slug => :string,
                                          :path => :string,
                                          :redirect_url => :string,
                                          :title_addon => :string,
                                          :menu_title => :string
                                      }, {:migrate_data => true})

    Content.create_translation_table!({
                                          :title => :string,
                                          :body => :text,
                                          :meta_title => :string,
                                          :meta_description => :text,
                                          :meta_keywords => :text,
                                          :slug => :string
                                      }, {:migrate_data => true})
  end

  def self.down
    Site.drop_translation_table! :migrate_data => true
    Section.drop_translation_table! :migrate_data => true
    Content.drop_translation_table! :migrate_data => true
  end
end
