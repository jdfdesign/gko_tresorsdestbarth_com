# This migration comes from gko_store (originally 20120823175100)
class AddCounterCacheToZoneMembers < ActiveRecord::Migration
  def up
    add_column :zones, :zone_members_count, :integer, :default => 0

    Zone.reset_column_information
    Zone.find(:all).each do |zone|
      Zone.update_counters zone.id, :zone_members_count => zone.zone_members.length
    end
  end

  def down
    remove_column :zones, :zone_members_count
  end
end