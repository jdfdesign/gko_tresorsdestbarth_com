class AddPositionToContent < ActiveRecord::Migration
  def self.up
    add_column :contents, :position, :integer, :default => 1
    add_index :contents, [:position, :section_id]
    Site.all.each do |site|
      site.sections.all do |section|
        if section.content_type.present?
          contents = section.send(:"#{section.content_type.pluralize.underscore}")
          if contents.try(:any?)
            contents.each_with_index do |content, index|
              content.insert_at(index)
            end
          end
        end
      end
    end
  end

  def self.down
    remove_index :contents, [:position, :section_id] 
    remove_column :contents, :position
  end
end