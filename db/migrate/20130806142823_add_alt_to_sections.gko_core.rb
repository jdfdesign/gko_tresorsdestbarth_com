# This migration comes from gko_core (originally 20130626154000)
class AddAltToSections < ActiveRecord::Migration
  def change
    add_column :sections, :alt, :text
    add_column :section_translations, :alt, :text
  end
end
