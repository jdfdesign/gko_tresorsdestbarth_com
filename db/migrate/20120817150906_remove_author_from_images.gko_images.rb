# This migration comes from gko_images (originally 20120812102300)
class RemoveAuthorFromImages < ActiveRecord::Migration
  def up
    remove_column :images, :author_id if column_exists?(:images, :author_id)
  end

  def down
    add_column :images, :author_id, :integer unless column_exists?(:images, :author_id)
  end
end