class AddMenuTitleToSection < ActiveRecord::Migration
  def self.up
    unless column_exists?(:sections, :menu_title)
      add_column :sections, :menu_title, :string
    end
    unless column_exists?(:section_translations, :menu_title)
      add_column :section_translations, :menu_title, :string
    end
  end

  def self.down
    remove_column :sections, :menu_title
    remove_column :section_translations, :menu_title
  end
end
