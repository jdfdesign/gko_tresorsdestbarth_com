# This migration comes from gko_core (originally 20120318000000)
class AddLiquidModelTable < ActiveRecord::Migration
  def change
    unless table_exists?(:liquid_models)
      create_table :liquid_models do |t|
        t.references :site
        t.text :body
        t.string :path
        t.string :format
        t.string :locale
        t.string :handler
        t.boolean :partial, :default => false
        t.timestamps
      end
    end
  end
end