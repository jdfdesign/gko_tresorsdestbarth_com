# This migration comes from gko_auth (originally 20130725165000)
class RemoveSiteRegistrationAndAccount < ActiveRecord::Migration
  def up
    drop_table :site_registrations if table_exists?(:site_registrations)
    remove_column :users, :account_id if column_exists?(:users, :account_id)
    add_column :users, :site_id, :integer unless column_exists?(:users, :site_id)
    add_index :users, :site_id unless index_exists?(:users, :site_id) 
    @site = Site.first
    User.all.each do |user|
      user.update_attribute('site_id', @site.id)
    end
  end
end