# This migration comes from gko_core (originally 20120310111111)
class AddPositionToPartner < ActiveRecord::Migration
  def up
    unless column_exists?(:partners, :position)
      add_column :partners, :position, :integer, :default => 1
      add_index :partners, [:position, :section_id]
      Site.all.each do |site|
        site.partner_lists.all do |section|
          section.partners.each_with_index do |partner, index|
            partner.update_attribute('position', index)
          end 
        end
      end 
    end
  end
  
  def down
    remove_column :partners, :position
    remove_index :partners, [:position, :section_id]
  end
end