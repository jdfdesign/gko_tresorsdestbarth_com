# This migration comes from gko_stickers (originally 20130203153200)
class AddPathToStickers < ActiveRecord::Migration
  def up
    unless column_exists?(:stickers, :path)
      add_column :stickers, :path, :string
      add_column :sticker_translations, :path, :string

    end
    
    Sticker.all.each do |s|
      s.translations.each do |t|
        ::Globalize.locale = t.locale
        s.path = s.name.parameterize if s.name
        s.save
      end
    end
  end

  def down
    remove_column :stickers, :path
    remove_column :sticker_translations, :path
  end
end
