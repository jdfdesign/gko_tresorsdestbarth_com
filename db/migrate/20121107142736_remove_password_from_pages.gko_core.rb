# This migration comes from gko_core (originally 20121031121500)
class RemovePasswordFromPages < ActiveRecord::Migration
  def up
    remove_column :sections, :password
  end

  def down
    add_column :sections, :password, :string
  end
end