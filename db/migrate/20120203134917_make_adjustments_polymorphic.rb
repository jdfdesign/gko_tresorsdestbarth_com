class MakeAdjustmentsPolymorphic < ActiveRecord::Migration

  def change
    add_column :adjustments, :adjustable_type, :string
    rename_column :adjustments, :order_id, :adjustable_id
    execute "UPDATE adjustments SET adjustable_type = 'Order'"
  end

end