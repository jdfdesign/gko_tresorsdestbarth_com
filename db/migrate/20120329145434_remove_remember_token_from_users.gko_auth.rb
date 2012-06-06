# This migration comes from gko_auth (originally 20120311111111)
class RemoveRememberTokenFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :remember_token if column_exists?(:users, :remember_token)
  end
end