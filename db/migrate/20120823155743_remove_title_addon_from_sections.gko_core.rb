# This migration comes from gko_core (originally 20120822161900)
class RemoveTitleAddonFromSections < ActiveRecord::Migration
  def up
    remove_column :sections, :title_addon if column_exists?(:sections, :title_addon)
    remove_column :section_translations, :title_addon if column_exists?(:section_translations, :title_addon)
  end

  def down
    add_column :sections, :title_addon, :string
  end
end