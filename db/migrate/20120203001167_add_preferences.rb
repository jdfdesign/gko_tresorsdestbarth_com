class AddPreferences < ActiveRecord::Migration
  def self.up

    create_table :preferences, :force => true do |t|
      t.string :key, :null => false
      t.string :value_type, :limit => 50
      t.string :value
      t.timestamps
    end

    add_index :preferences, :key, :unique => true
    
  end

  def self.down
    remove_table :preferences
  end
end