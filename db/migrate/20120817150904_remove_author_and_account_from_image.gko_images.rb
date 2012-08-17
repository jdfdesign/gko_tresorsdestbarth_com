# This migration comes from gko_images (originally 20120807154800)
class RemoveAuthorAndAccountFromImage < ActiveRecord::Migration
  def up
    remove_column :images, :author_id
    remove_column :images, :account_id
  end
end
