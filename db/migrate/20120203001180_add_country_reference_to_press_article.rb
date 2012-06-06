class AddCountryReferenceToPressArticle < ActiveRecord::Migration
  def self.up
    #Just remove and add as no site use this gem now
    add_column :press_articles, :country_id, :integer
    remove_column :press_articles, :country
    add_index :press_articles, :country_id
  end

  def self.down
    remove_index :press_articles, :country_id
    remove_column :press_articles, :country_id
    add_column :press_articles, :country, :string
  end
end