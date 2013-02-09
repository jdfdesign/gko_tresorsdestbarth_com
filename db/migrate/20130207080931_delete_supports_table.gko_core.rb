# This migration comes from gko_core (originally 20130127112800)
class DeleteSupportsTable < ActiveRecord::Migration
  def up
    drop_table :supports if table_exists?(:supports)
  end
end