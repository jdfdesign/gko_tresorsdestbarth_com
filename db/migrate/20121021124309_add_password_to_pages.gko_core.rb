# This migration comes from gko_core (originally 20121009102600)
class AddPasswordToPages < ActiveRecord::Migration
  def up
    add_column :sections, :password, :string
  end

  def down
    remove_column :sections, :password
  end
end