source :rubygems

group :assets do
 gem 'sass-rails', '~> 3.2.6'
 gem 'coffee-rails', '~> 3.2.2'
 gem 'uglifier', '>= 1.0.3'
end

group :production do
 git "git@github.com:jdfdesign/gko_cms3_corestore.git" do
    gem 'gko_core'
    gem "gko_auth"
    gem "gko_documents"
    gem "gko_inquiries"
    gem "gko_features"
    gem "gko_categories"
    gem "gko_stickers"
    gem 'gko_store', '= 0.0.59',  :git => 'git@github.com:jdfdesign/gko_store.git'
  end
end
#group :development do
#  gem "gko_core", :path => '~/Github/gko_cms3_corestore/gko_core'
#  gem "gko_auth", :path => '~/Github/gko_cms3_corestore/gko_auth'
#  gem "gko_documents", :path => '~/Github/gko_cms3_corestore/gko_documents'
#  gem "gko_inquiries", :path => '~/Github/gko_cms3_corestore/gko_inquiries'
#  gem "gko_themes", :path => '~/Github/gko_cms3_corestore/gko_themes'
#  gem "gko_features", :path => '~/Github/gko_cms3_corestore/gko_features'
#  gem "gko_categories", :path => '~/Github/gko_cms3_corestore/gko_categories'
#  gem "gko_stickers", :path => '~/Github/gko_cms3_corestore/gko_stickers'
#  gem "gko_store", :path => '~/Github/gko/gko_store'
#end

#to solve undefined method `class_inheritable_accessor' for Quantified::Attribute:Class
gem "active_shipping", :git => 'git://github.com/Shopify/active_shipping.git', :tag => "v0.9.15"