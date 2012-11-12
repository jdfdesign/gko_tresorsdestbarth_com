# This migration comes from gko_core (originally 20120830141300)
class EnsurePositionLanguages < ActiveRecord::Migration
  def up
    unless column_exists?(:languages, :position)
      add_column :languages, :position, :integer, :default => 1
      add_index :languages, [:site_id, :position]
      Site.all.each do |site|
        site.languages.each_with_index do |l, i|
          l.position = i+1
          l.save
        end
      end
    end
  end

  def down
    remove_index :languages, [:site_id, :position]
    remove_column :languages, :position
  end
end