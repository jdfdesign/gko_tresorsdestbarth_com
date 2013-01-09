# This migration comes from gko_categories (originally 20121202071200)
class AddTimestampToCategories < ActiveRecord::Migration
  def self.up
    change_table(:categories, :bulk => true) do |t|
      t.timestamps
    end
    
    Category.all.each do |c|
      c.save(:created_at => Time.now, :updated_at => Time.now)
    end
  end
  
  def down
    change_table :categories do |t|
      t.remove_timestamps
    end
  end
end

