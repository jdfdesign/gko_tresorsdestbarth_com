# This migration comes from gko_core (originally 20130127113100)
class DeleteFieldsAndConfiguationsTable < ActiveRecord::Migration
  def up
    drop_table :field_types if table_exists?(:field_types)
    drop_table :field_values if table_exists?(:field_values)
    drop_table :configurations if table_exists?(:configurations)
  end
end