class AddAuthorToDocument < ActiveRecord::Migration
  def self.up
    #Just remove and add as no site use this gem now
    add_column :documents, :author_id, :integer
    add_index :documents, :author_id
  end

  def self.down
    remove_index :documents, :author_id
    remove_column :documents, :author_id
  end
end