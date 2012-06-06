class CreateStorePaymentNotifications < ActiveRecord::Migration
  def self.up
    create_table :payment_notifications do |t|
      t.text :params
      t.string :status
      t.string :transaction_id
      t.integer :order_id
      t.timestamps
    end
  end

  def self.down
    drop_table :payment_notifications
  end
end