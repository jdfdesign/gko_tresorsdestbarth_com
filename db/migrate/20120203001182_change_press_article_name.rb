class ChangePressArticleName < ActiveRecord::Migration
  def self.up
    rename_table :press_articles, :document_items
    sections = select_all "SELECT * FROM sections"
    sections.each do |section|
      if section['type'] == 'PressArticleList'
        execute "UPDATE sections SET type = 'DocumentList' WHERE id = #{section['id']}"
      end
    end 
  end

  def self.down

  end
end