# Adjust user to be compatible with spree shop

class AdjustForShop < ActiveRecord::Migration
  def self.up
    
    create_table "roles", :force => true do |t|
      t.string "name"
    end

    create_table "roles_users", :id => false, :force => true do |t|
      t.integer "role_id"
      t.integer "user_id"
    end

    add_index "roles_users", ["role_id"], :name => "index_roles_users_on_role_id"
    add_index "roles_users", ["user_id"], :name => "index_roles_users_on_user_id"

    add_column :users, :password_salt, :string 
    #add_column :users, :remember_token, :string
    add_column :users, :persistence_token, :string
    add_column :users, :perishable_token, :string
    add_column :users, :failed_attempts, :integer, :default => 0, :null => false
    add_column :users, :last_request_at, :datetime
    add_column :users, :login, :string
    add_column :users, :authentication_token, :string
    add_column :users, :unlock_token, :string
    add_column :users, :locked_at, :datetime
    #add_column :users, :api_key, :string, :limit => 40

    add_index "users", ["persistence_token"], :name => "index_users_on_persistence_token"
    
    remove_column :users, :roles

    create_table "tokenized_permissions", :force => true do |t|
      t.integer  "permissable_id"
      t.string   "permissable_type"
      t.string   "token"
      t.datetime "created_at"
      t.datetime "updated_at"
    end

    add_index "tokenized_permissions", ["permissable_id", "permissable_type"], :name => "index_tokenized_name_and_type"
    
    drop_table :permission_groups
    drop_table :groups 
    drop_table :permissions
    remove_index :users, :group_id 
    remove_column :users, :group_id
  end 

  def self.down
    add_column :users, :roles, :string
    remove_table "roles"
    remove_table "roles_users"
    remove_column :users, :password_salt 
    #remove_column :users, :remember_token
    remove_column :users, :persistence_token
    remove_column :users, :perishable_token
    remove_column :users, :failed_attempts
    remove_column :users, :last_request_at
    remove_column :users, :login, :string
    remove_column :users, :authentication_token
    remove_column :users, :unlock_token
    remove_column :users, :locked_at
    #remove_column :users, :api_key
    remove_index "users", ["persistence_token"]
    remove_table "tokenized_permissions"
  end
end