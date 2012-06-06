# This migration comes from gko_features (originally 20120329000000)
class AddPositionAndDatesToFeatures < ActiveRecord::Migration
  def up
    unless column_exists?(:features, :position)
      add_column :features, :position, :integer, :default => 1
      Site.all.each do |site|
        site.features.each_with_index do |feature, index|
          feature.update_attribute('position', index)
        end
      end
    end
    unless column_exists?(:features, :start_at)
      add_column :features, :start_at, :date
    end
    unless column_exists?(:features, :end_at)
      add_column :features, :end_at, :date
    end
  end

  def down
    if column_exists?(:features, :position)
      remove_column :features, :position
    end
    if column_exists?(:features, :start_at)
      remove_column :features, :start_at
    end
    if column_exists?(:features, :end_at)
      remove_column :features, :end_at
    end
  end
end
