GkoTresorsDeStBarthCom::Application.config.app_middleware.use ExceptionNotifier,
:email_prefix => "[Exception] ",
:sender_address => "no-reply@joufdesign.com",
:exception_recipients => "admin@joufdesign.com",
:smtp_settings => {
    :user_name => "regis@joufdesign.com",
    :password => "rgsbrgghmn72",
    :address => "mail.joufdesign.com",
    :domain => "joufdesign.com",
    :port => 25,
    :mail_auth_type => 'login'
    :secure_connection_type => 'None',
    :enable_starttls_auto => false
}