class CreatePermissions < ActiveRecord::Migration
  def self.up
    
    create_table :groups, :force => true do |t| 
      t.string :name 
      t.string :description 
      t.boolean :restricted
      t.timestamps
    end
    
    create_table :permissions, :force => true do |t|
      t.string :plugin_name   
      t.string :path
      t.string :action
      t.boolean :restricted
      t.timestamps
    end
    
    create_table :permission_groups, :force => true do |t|
      t.references :group 
      t.references :permission 
    end
    add_index :permission_groups, [:group_id, :permission_id]
    
    add_column :users, :group_id, :integer
    add_index :users, :group_id

  end

  def self.down
    drop_table :permission_groups
    drop_table :groups 
    drop_table :permissions
    remove_index :users, :group_id 
    remove_column :users, :group_id
  end
end