class AddDefaultTaxZone < ActiveRecord::Migration
  def change
    add_column :zones, :default_tax, :boolean, :default => false
  end
end
