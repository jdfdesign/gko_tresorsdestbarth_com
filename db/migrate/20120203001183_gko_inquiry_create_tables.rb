class GkoInquiryCreateTables < ActiveRecord::Migration
  def self.up
    create_table :inquiries, :force => true do |t|
      t.string :type
      t.string :confirmation_code, :limit => 40
      t.string   :to_email
      t.string   :name
      t.string   :email
      t.string   :phone
      t.text     :message
      t.boolean  :open,       :default => true
      t.datetime :created_at
      t.datetime :updated_at
      t.datetime :confirmed_at
      t.boolean  :spam,       :default => false
      t.text     :options
      t.references :site
    end
    
    add_index :inquiries, :site_id

  end

  def self.down
     drop_table :inquiries

  end
end