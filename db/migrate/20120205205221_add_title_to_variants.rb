class AddTitleToVariants < ActiveRecord::Migration
  def change
    add_column :variants, :alt_title, :string
  end
end