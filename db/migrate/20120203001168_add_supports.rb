class AddSupports < ActiveRecord::Migration
  def self.up
    create_table :supports, :force => true do |t|
      t.references :owner, :polymorphic => true
      t.text :infos
    end
    add_index :supports, [:owner_id, :owner_type], :unique => true
  end

  def self.down
    remove_table :supports
  end
end