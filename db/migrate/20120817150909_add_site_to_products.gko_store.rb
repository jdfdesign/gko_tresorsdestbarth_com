# This migration comes from gko_store (originally 20120812122400)
class AddSiteToProducts < ActiveRecord::Migration
  def up
    add_column :products, :site_id, :integer
    add_index :products, :site_id
    
    Product.all.each do |p|
      p.update_attribute(:site_id, p.section.site_id)
    end
  end
end