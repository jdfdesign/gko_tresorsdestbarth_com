# This migration comes from gko_inquiries (originally 20120311333333)
class AddPreferencesToMailMethods < ActiveRecord::Migration
  def up
    if column_exists?(:mail_methods, :enable_mail_delivery)
      pref_keys = ['enable_mail_delivery', 'mail_host', 'mail_domain', 'mail_port', 'mail_auth_type', 'smtp_username', 'smtp_password', 'secure_connection_type', 'mails_from', 'mail_bcc', 'intercept_email']
      Site.all.each do |site|
        Site.current = site
        site.mail_methods.all.each do |m|
          pref_keys.each do |k|
            pref_val = m.send("preferred_#{k}")
            actual_val = m.send(k.to_sym)
            if pref_val != actual_val
              m.set_preference(k, actual_val)
            end
          end
        end
      end 
    end
  end

  def down
    pref_keys = ['enable_mail_delivery', 'mail_host', 'mail_domain', 'mail_port', 'mail_auth_type', 'smtp_username', 'smtp_password', 'secure_connection_type', 'mails_from', 'mail_bcc', 'intercept_email']
    Site.all.each do |site|
      Site.current = site
      site.mail_methods.all.each do |m|
        pref_keys.each do |k|
          if p = Preference.find_by_key("mail_method/#{k}/#{m.id}")
            p.destroy
          end
        end
        m.clear_preferences 
      end
    end
  end
end