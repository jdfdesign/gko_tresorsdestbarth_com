# This migration comes from gko_images (originally 20130127112000)
class DeleteElementImagesTable < ActiveRecord::Migration
  def up
     drop_table :element_images if table_exists?(:element_images)
  end
end