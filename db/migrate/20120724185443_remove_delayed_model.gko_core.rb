# This migration comes from gko_core (originally 20120721111111)
class RemoveDelayedModel < ActiveRecord::Migration
  def up
    drop_table :delayed_jobs if table_exists?(:delayed_jobs)
  end

  def down

  end
end