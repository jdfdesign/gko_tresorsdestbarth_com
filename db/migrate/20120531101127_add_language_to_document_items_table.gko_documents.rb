# This migration comes from gko_documents (originally 20120510000000)
# This migration comes from gko_documents (originally 20120510000000)
class AddLanguageToDocumentItemsTable < ActiveRecord::Migration
  def up
    unless column_exists?(:document_items, :language)
      add_column :document_items, :language, :string, :limit => 5
    end 
  end

  def down
    if column_exists?(:document_items, :language)
      remove_column :document_items, :language
    end
  end
end