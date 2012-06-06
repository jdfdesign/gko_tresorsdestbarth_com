# This migration comes from gko_inquiries (originally 20120311444444)
class RemoveUnusedColumnsFromMailMethods < ActiveRecord::Migration
  def up
    if column_exists?(:mail_methods, :enable_mail_delivery)
      remove_column :mail_methods, :enable_mail_delivery
      remove_column :mail_methods, :mail_host
      remove_column :mail_methods, :mail_domain
      remove_column :mail_methods, :mail_port 
      remove_column :mail_methods, :mail_auth_type
      remove_column :mail_methods, :smtp_username
      remove_column :mail_methods, :smtp_password
      remove_column :mail_methods, :secure_connection_type
      remove_column :mail_methods, :mails_from
      remove_column :mail_methods, :mail_bcc 
      remove_column :mail_methods, :intercept_email
    end 
  end
  def down
    unless column_exists?(:mail_methods, :enable_mail_delivery)
      add_column :mail_methods, :enable_mail_delivery, :boolean, :default => true
      add_column :mail_methods, :mail_host, :string
      add_column :mail_methods, :mail_domain, :string
      add_column :mail_methods, :mail_port, :string, :default => 25 
      add_column :mail_methods, :mail_auth_type, :string
      add_column :mail_methods, :smtp_username, :string
      add_column :mail_methods, :smtp_password, :string
      add_column :mail_methods, :secure_connection_type, :string
      add_column :mail_methods, :mails_from, :string
      add_column :mail_methods, :mail_bcc, :string 
      add_column :mail_methods, :intercept_email, :string
    end 
  end
end