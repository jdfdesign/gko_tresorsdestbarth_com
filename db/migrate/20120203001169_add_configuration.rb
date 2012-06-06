class AddConfiguration < ActiveRecord::Migration
  def self.up
    create_table :configurations, :force => true do |t|
      t.references :site
      t.string :name
      t.string :type, :limit => 50
      t.timestamps
      
    end

    add_index :configurations, [:site_id, :name, :type]

  end

  def self.down
    remove_table :configurations  
  end
end