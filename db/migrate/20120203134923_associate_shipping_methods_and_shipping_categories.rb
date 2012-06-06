class AssociateShippingMethodsAndShippingCategories < ActiveRecord::Migration
  def change
    change_table :shipping_methods do |t|
      t.references :shipping_category
    end
  end
end