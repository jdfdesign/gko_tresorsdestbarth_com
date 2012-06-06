class GkoCmsCreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users, :force => true do |t|
      t.references :account

      #t.database_authenticatable
      #t.confirmable
      #t.recoverable
      #t.rememberable
      #t.trackable
      
      
      ## devise
      t.string :email, :null => false, :default => ''
      t.string :encrypted_password, :limit => 128, :null => false, :default => ''
      t.string :confirmation_token
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      t.string :reset_password_token
      t.string :remember_token
      t.string :remember_created_at
      t.integer :sign_in_count
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string :current_sign_in_ip
      t.string :last_sign_in_ip
      ## end devise 

      t.string :roles
      t.string :username, :limit => 60
      t.string :firstname, :limit => 60
      t.string :lastname, :limit => 60
      t.string :preferred_language, :limit => 5
      t.string :timezone
      t.integer :site_registrations_count, :default => 0
      t.timestamps
    end

    add_index :users, :account_id

    add_column :sites, :site_registrations_count, :integer, :default => 0

    create_table :site_registrations do |t|
      t.integer :user_id
      t.integer :site_id
    end

    add_index :site_registrations, [:user_id, :site_id]
  end

  def self.down
    remove_column :sites, :site_registrations_count
    remove_index :users, :account_id
    drop_table :users
    remove_index :site_registrations, [:user_id, :site_id]
    drop_table :site_registrations
  end
end