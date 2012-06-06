# This migration comes from gko_auth (originally 20120311222222)
class AddDefaultValueToUsers < ActiveRecord::Migration
  def change
    change_column_default(:users, :sign_in_count, 0)
  end
end