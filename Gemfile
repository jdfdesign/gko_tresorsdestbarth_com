source :rubygems

group :assets do
 gem 'sass-rails', '~> 3.2.6'
 gem 'coffee-rails', '~> 3.2.2'
 gem 'uglifier', '>= 1.0.3'
end

group :production do
  git "git@github.com:jdfdesign/gko_cms3.git", :tag => "v0.6.24.RC12" do
    gem 'gko_core'
    gem "gko_auth"
    gem "gko_images"
   gem "gko_documents"
    gem "gko_inquiries"
    gem "gko_themes"
    gem "gko_features"
   gem "gko_categories"
    gem "gko_stickers"
    gem 'gko_store', '= 0.0.51',  :git => 'git@github.com:jdfdesign/gko_store.git'
  end
	 #to solve undefined method `class_inheritable_accessor' for Quantified::Attribute:Class
  gem "active_shipping", :git => 'git://github.com/Shopify/active_shipping.git'
end

#group :development do
#  gem "gko_core", :path => '~/Github/gko_cms3/gko_core'
#  gem "gko_auth", :path => '~/Github/gko_cms3/gko_auth'
#  gem "gko_images", :path => '~/Github/gko_cms3/gko_images'
#  gem "gko_documents", :path => '~/Github/gko_cms3/gko_documents'
#  gem "gko_inquiries", :path => '~/Github/gko_cms3/gko_inquiries'
#  gem "gko_themes", :path => '~/Github/gko_cms3/gko_themes'
#  gem "gko_features", :path => '~/Github/gko_cms3/gko_features'
#  gem "gko_categories", :path => '~/Github/gko_cms3/gko_categories'
#  gem "gko_stickers", :path => '~/Github/gko_cms3/gko_stickers'
#  gem "gko_store", :path => '~/Github/gko/gko_store'
	 #to solve undefined method `class_inheritable_accessor' for Quantified::Attribute:Class
#  gem "active_shipping", :git => 'git://github.com/Shopify/active_shipping.git'
#end    
