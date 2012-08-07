# This migration comes from gko_core (originally 20120802111111)
class AddAccessCountToContents < ActiveRecord::Migration
  def change
    add_column :contents, :access_count, :integer, :default => 0
    add_index :contents, :access_count
  end
end