# This migration comes from gko_core (originally 20130621151100)
class RenamePartnersUrlToLink < ActiveRecord::Migration
  def up
    change_table :partners do |t|
      t.rename :url, :link
    end
  end

  def down
    change_table :partners do |t|
      t.rename :link, :url
    end
  end
end