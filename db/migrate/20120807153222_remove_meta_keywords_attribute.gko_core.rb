# This migration comes from gko_core (originally 20120802222222)
class RemoveMetaKeywordsAttribute < ActiveRecord::Migration
  def up
    ActiveRecord::Base.connection.tables.map do |model|
      if column_exists?(model.tableize, :meta_keywords)
        remove_column model.tableize, :meta_keywords
      end
    end
  end

  def down

  end
end