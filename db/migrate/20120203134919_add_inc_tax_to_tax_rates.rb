class AddIncTaxToTaxRates < ActiveRecord::Migration
  def change
    add_column :tax_rates, :inc_tax, :boolean, :default => false
  end
end