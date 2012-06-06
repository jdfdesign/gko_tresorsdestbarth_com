class GkoCoreCreate < ActiveRecord::Migration
  def self.up


    create_table :accounts, :force => true do |t|
      t.string :reference, :limit => 40
      t.string :nickname
      t.string :status, :limit => 40
      t.string :type, :limit => 40
      t.datetime :deleted_at
      t.datetime :expires_at
      t.timestamps
    end

    create_table :sites, :force => true do |t|
      t.references :account
      t.string :host
      t.string :title
      t.string :meta_title
      t.string :subtitle
      t.string :timezone
      t.string :locales, :limit => 17
      t.boolean :public, :default => true
      t.text :options
      t.timestamps
    end
    add_index :sites, :account_id
    add_index :sites, :host, :unique => :true

    create_table :settings, :force => true do |t|
      t.references :site
      t.string :name
      t.text :value
      t.boolean :destroyable, :default => true
      t.string :scoping
      t.boolean :restricted, :default => false
      t.string :callback_proc_as_string
      t.string :form_value_type, :default => 'text_area', :null => false
      t.timestamps
    end
    add_index :settings, :name
    add_index :settings, :site_id

    create_table :dynamic_files, :force => true do |t|
      t.references :site
      t.string :type
      t.string :file_type
      t.string :name
      t.string :format
      t.string :handler
      t.text :body
      t.timestamps
    end

    add_index :dynamic_files, :name
    add_index :dynamic_files, :site_id

    create_table :sections, :force => true do |t|
      t.references :site
      t.references :parent
      t.references :link, :polymorphic => true

      t.integer :lft
      t.integer :rgt
      t.string :type
      t.string :name
      t.string :slug
      t.string :path
      t.integer :level
      t.text :options

      t.string :title
      t.string :layout
      t.text :body
      t.string :meta_title
      t.text :meta_description
      t.text :meta_keywords
      t.string :redirect_url
      t.string :title_addon
      t.datetime :published_at

      t.boolean :hidden, :default => false
      t.timestamps
    end
    add_index :sections, :site_id
    add_index :sections, :parent_id
    add_index :sections, [:link_id, :link_type]

    create_table :contents, :force => true do |t|
      t.references :site
      t.references :section
      t.references :account
      t.references :author
      t.string :type
      t.string :title
      t.string :slug
      t.text :body
      t.datetime :published_at
      t.string :layout, :limit => 40
      t.string :meta_title
      t.text :meta_description
      t.text :meta_keywords
      t.text :options
      t.string :author_name, :limit => 120
      t.timestamps
    end
    add_index :contents, :section_id
    add_index :contents, :site_id
    add_index :contents, :slug

  end

  def self.down
    drop_table :accounts
    drop_table :sites
    drop_table :sections
    drop_table :contents
    drop_table :settings
    drop_table :dynamic_files
  end
end
