class GkoDocumentsCreate < ActiveRecord::Migration
  def self.up
    create_table :documents, :force => true do |t|
      t.string :title, :limit => 100
      t.string :lang, :limit => 4
      t.string :alt
      t.references :account
      t.references :site
      t.integer :document_assignments_count, :default => 0
      t.timestamps

      t.string :document_mime_type
      t.string :document_name
      t.integer :document_size
      t.string :document_uid
      t.string :document_ext
    end

    add_index :documents, :account_id
    add_index :documents, :site_id
    
    create_table :document_assignments, :force => true do |t|
      t.integer :position, :null => false, :default => 1
      t.integer :document_id, :null => false
      t.integer :attachable_id, :null => false
      t.string :attachable_type, :null => false, :limit => 40
      t.timestamps
    end

    add_index :document_assignments, [:attachable_id, :attachable_type]
    add_index :document_assignments, [:document_id]
  end

  def self.down
    drop_table :documents
    drop_table :document_assignments
  end
end
