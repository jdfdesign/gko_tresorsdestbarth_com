# This migration comes from gko_store (originally 20120823180000)
class AddDeletedAtToShippingMethods < ActiveRecord::Migration
  def change
    add_column :shipping_methods, :deleted_at, :datetime
  end
end
