# This migration comes from gko_core (originally 20130103085700)
class CreateMailMethodsTable < ActiveRecord::Migration
  def up
    create_table :mail_methods do |t|
      t.integer :site_id, :null => false
      t.string :environment, :default => 'production'
      t.boolean :enable_mail_delivery, :default => true
      t.string :mail_host, :default => 'localhost'
      t.string :mail_domain, :default => 'localhost'
      t.integer :mail_port, :default => 25
      t.string :mail_auth_type, :default => 'none'
      t.string :smtp_username, :null => false
      t.string :smtp_password, :null => false
      t.string :secure_connection_type, :default => 'None'
      t.string :mails_from, :default => 'no-reply@joufdesign.com'
      t.string :mail_bcc
      t.timestamps
    end
    
    add_index :mail_methods, :site_id
  end

  def down
    drop_table :mail_methods
  end
end