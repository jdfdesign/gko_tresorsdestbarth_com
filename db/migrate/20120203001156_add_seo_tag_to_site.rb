class AddSeoTagToSite < ActiveRecord::Migration
  def self.up
    unless column_exists?(:sites, :meta_title)
      add_column :sites, :meta_title, :string
      add_column :site_translations, :meta_title, :string
    end
  end

  def self.down
    remove_column :site_translations, :meta_title
    remove_column :sites, :meta_title
  end
end
