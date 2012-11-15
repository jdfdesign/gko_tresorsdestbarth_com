source :rubygems

gem 'iconv'

group :assets do
 gem 'sass-rails', '~> 3.2.5'
 gem 'coffee-rails', '~> 3.2.2'
 gem 'uglifier', '>= 1.0.3'
end

prod_location = 'git@github.com:jdfdesign/gko_cms3.git'
prod_version = "= 0.4.47"
group :production do
	gem 'gko_core', prod_version, :git => prod_location
  gem "gko_auth", prod_version, :git => prod_location
  gem "gko_images", prod_version, :git => prod_location
  gem "gko_documents", prod_version, :git => prod_location
  gem "gko_inquiries", prod_version, :git => prod_location
  gem "gko_themes", prod_version, :git => prod_location
  gem "gko_features", prod_version, :git => prod_location
  gem "gko_categories", prod_version, :git => prod_location
  gem "gko_stickers", prod_version, :git => prod_location
  gem 'gko_store', '= 0.0.46',  :git => 'git@github.com:jdfdesign/gko_store.git'
	 #to solve undefined method `class_inheritable_accessor' for Quantified::Attribute:Class
  gem "active_shipping", :git => 'git://github.com/Shopify/active_shipping.git'
end
#group :development do
#	gem "gko_core", :path => File.expand_path('~/Github/gko_cms3/gko_core', __FILE__)
#	gem "gko_auth", :path => File.expand_path('~/Github/gko_cms3/gko_auth', __FILE__)
#	gem "gko_images", :path => File.expand_path('~/Github/gko_cms3/gko_images', __FILE__)
#	gem "gko_documents", :path => File.expand_path('~/Github/gko_cms3/gko_documents', __FILE__)
#	gem "gko_inquiries", :path => File.expand_path('~/Github/gko_cms3/gko_inquiries', __FILE__)
#	gem "gko_themes", :path => File.expand_path('~/Github/gko_cms3/gko_themes', __FILE__)
#	gem "gko_features", :path => File.expand_path('~/Github/gko_cms3/gko_features', __FILE__)
#	gem "gko_categories", :path => File.expand_path('~/Github/gko_cms3/gko_categories', __FILE__)
#	gem "gko_stickers", :path => File.expand_path('~/Github/gko_cms3/gko_stickers', __FILE__)
#	gem "gko_store", :path => File.expand_path('~/Github/gko/gko_store', __FILE__)
	 #to solve undefined method `class_inheritable_accessor' for Quantified::Attribute:Class
#	gem "active_shipping", :git => 'git://github.com/Shopify/active_shipping.git'
#end    
