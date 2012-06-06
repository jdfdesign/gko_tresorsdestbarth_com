class CreateMailMethod < ActiveRecord::Migration
  def self.up
    create_table :mail_methods, :force => true do |t|
      t.references :site
      t.string :environment
      t.boolean :active, :default => true 
      t.boolean :enable_mail_delivery, :default => true
      t.string :mail_host
      t.string :mail_domain
      t.integer :mail_port, :default => 25 
      t.string :mail_auth_type
      t.string :smtp_username
      t.string :smtp_password
      t.string :secure_connection_type
      t.string :mails_from
      t.string :mail_bcc 
      t.string :intercept_email
      t.timestamps
    end
    
    add_index :mail_methods, :site_id 
  end

  def self.down
    drop_table :mail_methods
  end
end