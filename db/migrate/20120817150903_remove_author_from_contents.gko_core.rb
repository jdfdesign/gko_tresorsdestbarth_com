# This migration comes from gko_core (originally 20120812101900)
class RemoveAuthorFromContents < ActiveRecord::Migration
  def up
    remove_column :contents, :author_id if column_exists?(:contents, :author_id)
  end

  def down
    add_column :contents, :author_id, :integer unless column_exists?(:contents, :author_id)
  end
end