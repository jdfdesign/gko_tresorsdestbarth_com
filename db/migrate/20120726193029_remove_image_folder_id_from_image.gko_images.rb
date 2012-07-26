# This migration comes from gko_images (originally 20120725000000)
class RemoveImageFolderIdFromImage < ActiveRecord::Migration
  def up
    Image.all.each do |image|
      if(image.image_folder_id.present?)
        folder = ImageFolder.find(image.image_folder_id)
        folder.images << image
      end
    end
    remove_column :images, :image_folder_id
    
  end
end
