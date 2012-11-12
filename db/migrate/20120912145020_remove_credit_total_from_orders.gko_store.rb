# This migration comes from gko_store (originally 20120823175900)
class RemoveCreditTotalFromOrders < ActiveRecord::Migration
  def change
    remove_column :orders, :credit_total
  end
end
