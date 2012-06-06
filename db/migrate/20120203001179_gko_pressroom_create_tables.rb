class GkoPressroomCreateTables < ActiveRecord::Migration
  def self.up
    create_table :press_articles do |t|
      t.string :title
      t.text :body  
      t.string :country
      t.date :published_at
      t.integer :site_id
      t.integer :section_id 

      t.string :document_mime_type
      t.string :document_name
      t.integer :document_size
      t.string :document_uid
      t.string :document_ext
      
      t.string :image_mime_type
      t.string :image_name
      t.integer :image_size
      t.integer :image_width
      t.integer :image_height
      t.string :image_uid
      t.string :image_ext
      t.timestamps
    end   
    add_index :press_articles, :site_id   
    add_index :press_articles, :section_id 
  end

  def self.down
    drop_table :press_articles
  end
end