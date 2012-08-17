# This migration comes from gko_categories (originally 20120812125000)
class RemoveLevelFromCategories < ActiveRecord::Migration
  def up
    remove_column :categories, :level if column_exists?(:categories, :level)
  end
end