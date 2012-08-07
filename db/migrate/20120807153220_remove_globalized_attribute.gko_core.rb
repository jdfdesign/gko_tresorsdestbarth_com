# This migration comes from gko_core (originally 20120801111111)
class RemoveGlobalizedAttribute < ActiveRecord::Migration
  def up
    ActiveRecord::Base.connection.tables.map do |model|
      if column_exists?(model.tableize, :globalized)
        remove_column model.tableize, :globalized
      end
    end
  end

  def down

  end
end