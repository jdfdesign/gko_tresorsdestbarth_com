# This migration comes from gko_documents (originally 20130725165400)
class RemoveAccountFromDocument < ActiveRecord::Migration
  def up
    remove_column :documents, :account_id if column_exists?(:documents, :account_id)
  end
end