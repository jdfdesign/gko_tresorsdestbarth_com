class AddCompanyToAddresses < ActiveRecord::Migration
  def change
    add_column :addresses, :company, :string
  end
end