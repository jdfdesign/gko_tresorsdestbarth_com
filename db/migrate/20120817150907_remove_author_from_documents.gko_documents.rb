# This migration comes from gko_documents (originally 20120812103300)
class RemoveAuthorFromDocuments < ActiveRecord::Migration
  def up
    remove_column :documents, :author_id if column_exists?(:documents, :author_id)
  end

  def down
    add_column :documents, :author_id, :integer unless column_exists?(:documents, :author_id)
  end
end