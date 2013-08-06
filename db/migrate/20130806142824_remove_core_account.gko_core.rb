# This migration comes from gko_core (originally 20130724114300)
class RemoveCoreAccount < ActiveRecord::Migration
  def up
    drop_table :accounts if table_exists?(:accounts)
    remove_column :sites, :account_id if column_exists?(:sites, :account_id)
  end
end