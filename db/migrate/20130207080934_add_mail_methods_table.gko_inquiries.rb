# This migration comes from gko_inquiries (originally 20130127112500)
class AddMailMethodsTable < ActiveRecord::Migration
  def up
    unless table_exists?(:mail_methods)
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
      
      Site.all.each do |site|
        Site.current = site
        site.mail_methods.create(
          :environment => 'production',
          :mail_host => Gko::Core.default_smtp_settings[:mail_host],
          :mail_domain => Gko::Core.default_smtp_settings[:mail_domain],
          :mail_auth_type => Gko::Core.default_smtp_settings[:mail_auth_type],
          :smtp_username => Gko::Core.default_smtp_settings[:smtp_username],
          :smtp_password => Gko::Core.default_smtp_settings[:smtp_password],
          :secure_connection_type => Gko::Core.default_smtp_settings[:secure_connection_type],
          :mails_from => Gko::Core.default_smtp_settings[:mails_from],
          :mail_bcc => Gko::Core.default_smtp_settings[:mail_bcc]
        )
      end
      
    end
  end

  def down
    drop_table :mail_methods
  end
end