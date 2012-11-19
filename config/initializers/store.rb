GkoTresorsDeStBarthCom::Application.config.session_store :cookie_store, :key => "#{APP_CONFIG["session_store_key"]}"

Gko::PaypalWebsiteStandard::Config.set(:account => "info@tresorsdestbarth.com") 
Gko::PaypalWebsiteStandard::Config.set(:success_url => "http://tresorsdestbarth.com/paypal/confirm")
#Gko::PaypalWebsiteStandard::Config.set(:success_url => "#{APP_CONFIG["pp_api_id"]}")
#Gko::PaypalWebsiteStandard::Config.set(:success_url => "#{APP_CONFIG["pp_api_pass"]}")
#Gko::PaypalWebsiteStandard::Config.set(:success_url => "#{APP_CONFIG["pp_api_signature"]}")
