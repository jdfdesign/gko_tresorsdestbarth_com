# This migration comes from gko_core (originally 20120721000000)
class RemoveSettingModel < ActiveRecord::Migration
  def up
    drop_table :settings if table_exists?(:settings)
  end

  def down

  end
end