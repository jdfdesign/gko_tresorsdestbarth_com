class CreateCountryTable < ActiveRecord::Migration
  def self.up  
    create_table :countries, :force => true do |t|
      t.string :iso_name 
      t.string :iso3, :limit => 3
      t.string :iso, :limit => 2
      t.string :name
      t.integer :numcode, :limit => 4
      t.timestamps
    end
  end

  def self.down
    drop_table :countries
  end
end