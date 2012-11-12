class CreateLanguagesTable < ActiveRecord::Migration
  def up
    unless table_exists?(:languages)
      create_table :languages do |t|
        t.references :site
        t.string :name
        t.string :code
        t.integer :position, :default => 1
        t.string :presentation
        t.boolean :public, :default => false
        t.boolean :default, :default => false
        t.timestamps
      end
      add_index :languages, :site_id
      add_index :languages, [:site_id, :position]
      
      add_column :sites, :languages_count, :integer, :default => 0
      
      Site.all.each do |site|
        site.translated_locales.each_with_index do |locale, index|
          site.languages.create!({
            :name => I18n.t(:"locales.long.#{locale.to_s}"),
            :code => locale.to_s,
            :presentation => I18n.t(:"locales.long.#{locale.to_s}"),
            :public => true,
            :position => index + 1,
            :default => (index == 0)
          })
        end
      end
    end

  end
  
  def down
    remove_column :sites, :languages_count
    remove_index :languages, :site_id
    remove_index :languages, [:site_id, :position]
    drop_table :languages
  end
end