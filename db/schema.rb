# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120817150909) do

  create_table "accounts", :force => true do |t|
    t.string   "reference",  :limit => 40
    t.string   "nickname"
    t.string   "status",     :limit => 40
    t.string   "type",       :limit => 40
    t.datetime "deleted_at"
    t.datetime "expires_at"
    t.datetime "created_at",               :null => false
    t.datetime "updated_at",               :null => false
  end

  create_table "activators", :force => true do |t|
    t.string   "description"
    t.datetime "expires_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "starts_at"
    t.string   "name"
    t.string   "event_name"
    t.string   "type"
  end

  create_table "addresses", :force => true do |t|
    t.string   "firstname"
    t.string   "lastname"
    t.string   "address1"
    t.string   "address2"
    t.string   "city"
    t.integer  "state_id"
    t.string   "zipcode"
    t.integer  "country_id"
    t.string   "phone"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "state_name"
    t.string   "alternative_phone"
    t.string   "company"
  end

  add_index "addresses", ["firstname"], :name => "index_addresses_on_firstname"
  add_index "addresses", ["lastname"], :name => "index_addresses_on_lastname"

  create_table "adjustments", :force => true do |t|
    t.integer  "adjustable_id"
    t.decimal  "amount",          :precision => 8, :scale => 2
    t.string   "label"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "source_id"
    t.string   "source_type"
    t.boolean  "mandatory"
    t.boolean  "locked"
    t.integer  "originator_id"
    t.string   "originator_type"
    t.boolean  "eligible",                                      :default => true
    t.string   "adjustable_type"
  end

  add_index "adjustments", ["adjustable_id"], :name => "index_adjustments_on_order_id"

  create_table "calculators", :force => true do |t|
    t.string   "type"
    t.integer  "calculable_id",   :null => false
    t.string   "calculable_type", :null => false
    t.integer  "site_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "calculators", ["site_id"], :name => "index_calculators_on_site_id"

  create_table "categories", :force => true do |t|
    t.integer "site_id"
    t.integer "section_id"
    t.integer "parent_id"
    t.integer "lft",              :default => 0, :null => false
    t.integer "rgt",              :default => 0, :null => false
    t.string  "name"
    t.string  "slug"
    t.string  "path"
    t.string  "title"
    t.text    "body"
    t.string  "meta_title"
    t.text    "meta_description"
  end

  add_index "categories", ["parent_id"], :name => "index_categories_on_parent_id"
  add_index "categories", ["section_id"], :name => "index_categories_on_section_id"

  create_table "categorizations", :force => true do |t|
    t.integer "categorizable_id"
    t.string  "categorizable_type"
    t.integer "category_id"
  end

  add_index "categorizations", ["categorizable_id", "categorizable_type"], :name => "index_categorizations_on_categorizable_id_and_categorizable_type"
  add_index "categorizations", ["category_id"], :name => "index_categorizations_on_category_id"

  create_table "category_translations", :force => true do |t|
    t.integer  "category_id"
    t.string   "locale"
    t.string   "path"
    t.text     "body"
    t.string   "meta_title"
    t.string   "title"
    t.string   "slug"
    t.text     "meta_description"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  add_index "category_translations", ["category_id"], :name => "index_category_translations_on_category_id"
  add_index "category_translations", ["locale"], :name => "index_category_translations_on_locale"

  create_table "configurations", :force => true do |t|
    t.integer  "site_id"
    t.string   "name"
    t.string   "type",       :limit => 50
    t.datetime "created_at",               :null => false
    t.datetime "updated_at",               :null => false
  end

  add_index "configurations", ["site_id", "name", "type"], :name => "index_configurations_on_site_id_and_name_and_type"

  create_table "content_translations", :force => true do |t|
    t.integer  "content_id"
    t.string   "locale"
    t.text     "body"
    t.string   "meta_title"
    t.string   "title"
    t.string   "slug"
    t.text     "meta_description"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  add_index "content_translations", ["content_id"], :name => "index_content_translations_on_content_id"
  add_index "content_translations", ["locale"], :name => "index_content_translations_on_locale"

  create_table "contents", :force => true do |t|
    t.integer  "site_id"
    t.integer  "section_id"
    t.integer  "account_id"
    t.string   "type"
    t.string   "title"
    t.string   "slug"
    t.text     "body"
    t.datetime "published_at"
    t.string   "layout",           :limit => 40
    t.string   "meta_title"
    t.text     "meta_description"
    t.text     "options"
    t.string   "author_name",      :limit => 120
    t.datetime "created_at",                                     :null => false
    t.datetime "updated_at",                                     :null => false
    t.integer  "position",                        :default => 1
    t.integer  "access_count",                    :default => 0
  end

  add_index "contents", ["access_count"], :name => "index_contents_on_access_count"
  add_index "contents", ["position", "section_id"], :name => "index_contents_on_position_and_section_id"
  add_index "contents", ["section_id"], :name => "index_contents_on_section_id"
  add_index "contents", ["site_id"], :name => "index_contents_on_site_id"
  add_index "contents", ["slug"], :name => "index_contents_on_slug"

  create_table "countries", :force => true do |t|
    t.string   "iso_name"
    t.string   "iso3",       :limit => 3
    t.string   "iso",        :limit => 2
    t.string   "name"
    t.integer  "numcode"
    t.datetime "created_at",              :null => false
    t.datetime "updated_at",              :null => false
  end

  create_table "creditcards", :force => true do |t|
    t.string   "month"
    t.string   "year"
    t.string   "cc_type"
    t.string   "last_digits"
    t.string   "first_name"
    t.string   "last_name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "start_month"
    t.string   "start_year"
    t.string   "issue_number"
    t.integer  "address_id"
    t.string   "gateway_customer_profile_id"
    t.string   "gateway_payment_profile_id"
  end

  create_table "document_assignments", :force => true do |t|
    t.integer  "position",                      :default => 1, :null => false
    t.integer  "document_id",                                  :null => false
    t.integer  "attachable_id",                                :null => false
    t.string   "attachable_type", :limit => 40,                :null => false
    t.datetime "created_at",                                   :null => false
    t.datetime "updated_at",                                   :null => false
  end

  add_index "document_assignments", ["attachable_id", "attachable_type"], :name => "index_document_assignments_on_attachable_id_and_attachable_type"
  add_index "document_assignments", ["document_id"], :name => "index_document_assignments_on_document_id"

  create_table "document_items", :force => true do |t|
    t.string   "title"
    t.text     "body"
    t.date     "published_at"
    t.integer  "site_id"
    t.integer  "section_id"
    t.string   "document_mime_type"
    t.string   "document_name"
    t.integer  "document_size"
    t.string   "document_uid"
    t.string   "document_ext"
    t.string   "image_mime_type"
    t.string   "image_name"
    t.integer  "image_size"
    t.integer  "image_width"
    t.integer  "image_height"
    t.string   "image_uid"
    t.string   "image_ext"
    t.datetime "created_at",                      :null => false
    t.datetime "updated_at",                      :null => false
    t.integer  "country_id"
    t.string   "language",           :limit => 5
  end

  add_index "document_items", ["country_id"], :name => "index_press_articles_on_country_id"
  add_index "document_items", ["section_id"], :name => "index_press_articles_on_section_id"
  add_index "document_items", ["site_id"], :name => "index_press_articles_on_site_id"

  create_table "document_translations", :force => true do |t|
    t.integer  "document_id"
    t.string   "locale"
    t.string   "title"
    t.string   "alt"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "document_translations", ["document_id"], :name => "index_document_translations_on_document_id"
  add_index "document_translations", ["locale"], :name => "index_document_translations_on_locale"

  create_table "documents", :force => true do |t|
    t.string   "title",                      :limit => 100
    t.string   "lang",                       :limit => 4
    t.string   "alt"
    t.integer  "account_id"
    t.integer  "site_id"
    t.integer  "document_assignments_count",                :default => 0
    t.datetime "created_at",                                               :null => false
    t.datetime "updated_at",                                               :null => false
    t.string   "document_mime_type"
    t.string   "document_name"
    t.integer  "document_size"
    t.string   "document_uid"
    t.string   "document_ext"
  end

  add_index "documents", ["account_id"], :name => "index_documents_on_account_id"
  add_index "documents", ["site_id"], :name => "index_documents_on_site_id"

  create_table "feature_translations", :force => true do |t|
    t.integer  "feature_id"
    t.string   "locale"
    t.text     "body"
    t.string   "title"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "feature_translations", ["feature_id"], :name => "index_feature_translations_on_feature_id"
  add_index "feature_translations", ["locale"], :name => "index_feature_translations_on_locale"

  create_table "features", :force => true do |t|
    t.integer  "site_id"
    t.integer  "section_id"
    t.integer  "owner_id"
    t.string   "owner_type"
    t.string   "url"
    t.string   "title"
    t.text     "body"
    t.datetime "published_at"
    t.integer  "position",        :default => 1
    t.string   "image_mime_type"
    t.string   "image_name"
    t.integer  "image_size"
    t.integer  "image_width"
    t.integer  "image_height"
    t.string   "image_uid"
    t.string   "image_ext"
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
    t.date     "start_at"
    t.date     "end_at"
  end

  add_index "features", ["owner_type", "owner_id"], :name => "index_features_on_owner_type_and_owner_id"
  add_index "features", ["position", "section_id"], :name => "index_features_on_position_and_section_id"
  add_index "features", ["section_id"], :name => "index_features_on_section_id"
  add_index "features", ["site_id"], :name => "index_features_on_site_id"

  create_table "field_types", :force => true do |t|
    t.string   "name"
    t.string   "presentation"
    t.string   "value_type"
    t.integer  "site_id"
    t.string   "class_name"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  add_index "field_types", ["name"], :name => "index_field_types_on_name"
  add_index "field_types", ["site_id", "class_name"], :name => "index_field_types_on_site_id_and_class_name"

  create_table "field_values", :force => true do |t|
    t.integer  "field_type_id"
    t.integer  "customizable_id"
    t.string   "customizable_type"
    t.text     "body"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
  end

  add_index "field_values", ["customizable_id", "customizable_type"], :name => "index_field_values_on_customizable_id_and_customizable_type"
  add_index "field_values", ["field_type_id"], :name => "index_field_values_on_field_type_id"

  create_table "gateways", :force => true do |t|
    t.string   "type"
    t.string   "name"
    t.text     "description"
    t.boolean  "active",      :default => true
    t.string   "environment", :default => "development"
    t.string   "server",      :default => "test"
    t.boolean  "test_mode",   :default => true
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "image_assignments", :force => true do |t|
    t.integer  "position",                      :default => 1, :null => false
    t.integer  "image_id",                                     :null => false
    t.integer  "attachable_id",                                :null => false
    t.string   "attachable_type", :limit => 40,                :null => false
    t.datetime "created_at",                                   :null => false
    t.datetime "updated_at",                                   :null => false
  end

  add_index "image_assignments", ["attachable_id", "attachable_type"], :name => "index_image_assignments_on_attachable_id_and_attachable_type"
  add_index "image_assignments", ["image_id"], :name => "index_image_assignments_on_image_id"

  create_table "image_folders", :force => true do |t|
    t.string   "name"
    t.integer  "site_id"
    t.integer  "parent_id"
    t.integer  "lft"
    t.integer  "rgt"
    t.integer  "level"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "image_folders", ["parent_id"], :name => "index_image_folders_on_parent_id"
  add_index "image_folders", ["site_id"], :name => "index_image_folders_on_site_id"

  create_table "image_folders_images", :id => false, :force => true do |t|
    t.integer  "image_folder_id"
    t.integer  "image_id"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "image_folders_images", ["image_folder_id", "image_id"], :name => "index_image_folders_images_on_image_folder_id_and_image_id"
  add_index "image_folders_images", ["image_id", "image_folder_id"], :name => "index_image_folders_images_on_image_id_and_image_folder_id"

  create_table "images", :force => true do |t|
    t.integer  "site_id"
    t.integer  "image_assignments_count", :default => 0
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.string   "image_mime_type"
    t.string   "image_name"
    t.integer  "image_size"
    t.integer  "image_width"
    t.integer  "image_height"
    t.string   "image_uid"
  end

  add_index "images", ["site_id"], :name => "index_images_on_site_id"

  create_table "inquiries", :force => true do |t|
    t.string   "type"
    t.string   "confirmation_code", :limit => 40
    t.string   "to_email"
    t.string   "name"
    t.string   "email"
    t.string   "phone"
    t.text     "message"
    t.boolean  "open",                            :default => true
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "confirmed_at"
    t.boolean  "spam",                            :default => false
    t.text     "options"
    t.integer  "site_id"
  end

  add_index "inquiries", ["site_id"], :name => "index_inquiries_on_site_id"

  create_table "inventory_units", :force => true do |t|
    t.integer  "variant_id"
    t.integer  "order_id"
    t.string   "state"
    t.integer  "lock_version",            :default => 0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "shipment_id"
    t.integer  "return_authorization_id"
  end

  add_index "inventory_units", ["order_id"], :name => "index_inventory_units_on_order_id"
  add_index "inventory_units", ["shipment_id"], :name => "index_inventory_units_on_shipment_id"
  add_index "inventory_units", ["variant_id"], :name => "index_inventory_units_on_variant_id"

  create_table "line_items", :force => true do |t|
    t.integer  "order_id"
    t.integer  "variant_id"
    t.integer  "quantity",                                 :null => false
    t.decimal  "price",      :precision => 8, :scale => 2, :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "line_items", ["order_id"], :name => "index_line_items_on_order_id"
  add_index "line_items", ["variant_id"], :name => "index_line_items_on_variant_id"

  create_table "liquid_models", :force => true do |t|
    t.integer  "site_id"
    t.text     "body"
    t.string   "path"
    t.string   "format"
    t.string   "locale"
    t.string   "handler"
    t.boolean  "partial",    :default => false
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
  end

  create_table "log_entries", :force => true do |t|
    t.integer  "source_id"
    t.string   "source_type"
    t.text     "details"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "mail_methods", :force => true do |t|
    t.integer  "site_id"
    t.string   "environment"
    t.boolean  "active",      :default => true
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
  end

  add_index "mail_methods", ["site_id"], :name => "index_mail_methods_on_site_id"

  create_table "option_types", :force => true do |t|
    t.string   "name",         :limit => 100
    t.string   "presentation", :limit => 100
    t.integer  "site_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "position",                    :default => 0, :null => false
  end

  add_index "option_types", ["site_id"], :name => "index_option_types_on_site_id"

  create_table "option_types_prototypes", :id => false, :force => true do |t|
    t.integer "prototype_id"
    t.integer "option_type_id"
  end

  create_table "option_values", :force => true do |t|
    t.integer  "option_type_id"
    t.string   "name"
    t.integer  "position"
    t.string   "presentation"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "option_values_variants", :id => false, :force => true do |t|
    t.integer "variant_id"
    t.integer "option_value_id"
  end

  add_index "option_values_variants", ["variant_id", "option_value_id"], :name => "index_option_values_variants_on_variant_id_and_option_value_id"
  add_index "option_values_variants", ["variant_id"], :name => "index_option_values_variants_on_variant_id"

  create_table "orders", :force => true do |t|
    t.integer  "user_id"
    t.string   "number",               :limit => 15
    t.decimal  "item_total",                         :precision => 8, :scale => 2, :default => 0.0, :null => false
    t.decimal  "total",                              :precision => 8, :scale => 2, :default => 0.0, :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "state"
    t.decimal  "adjustment_total",                   :precision => 8, :scale => 2, :default => 0.0, :null => false
    t.decimal  "credit_total",                       :precision => 8, :scale => 2, :default => 0.0, :null => false
    t.datetime "completed_at"
    t.integer  "bill_address_id"
    t.integer  "ship_address_id"
    t.decimal  "payment_total",                      :precision => 8, :scale => 2, :default => 0.0
    t.integer  "shipping_method_id"
    t.integer  "site_id"
    t.string   "shipment_state"
    t.string   "payment_state"
    t.string   "email"
    t.text     "special_instructions"
  end

  add_index "orders", ["number"], :name => "index_orders_on_number"
  add_index "orders", ["site_id"], :name => "index_orders_on_site_id"

  create_table "partner_translations", :force => true do |t|
    t.integer  "partner_id"
    t.string   "locale"
    t.text     "body"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "partner_translations", ["locale"], :name => "index_partner_translations_on_locale"
  add_index "partner_translations", ["partner_id"], :name => "index_partner_translations_on_partner_id"

  create_table "partners", :force => true do |t|
    t.string   "title"
    t.text     "body"
    t.string   "url"
    t.integer  "site_id"
    t.integer  "section_id"
    t.string   "image_mime_type"
    t.string   "image_name"
    t.integer  "image_size"
    t.integer  "image_width"
    t.integer  "image_height"
    t.string   "image_uid"
    t.string   "image_ext"
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
    t.integer  "position",        :default => 1
  end

  add_index "partners", ["position", "section_id"], :name => "index_partners_on_position_and_section_id"
  add_index "partners", ["section_id"], :name => "index_partners_on_section_id"
  add_index "partners", ["site_id"], :name => "index_partners_on_site_id"

  create_table "payment_methods", :force => true do |t|
    t.string   "type"
    t.string   "name"
    t.text     "description"
    t.boolean  "active",      :default => true
    t.string   "environment", :default => "development"
    t.integer  "site_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
    t.string   "display_on"
  end

  add_index "payment_methods", ["site_id"], :name => "index_payment_methods_on_site_id"

  create_table "payment_notifications", :force => true do |t|
    t.text     "params"
    t.string   "status"
    t.string   "transaction_id"
    t.integer  "order_id"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  create_table "payments", :force => true do |t|
    t.integer  "order_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.decimal  "amount",            :precision => 8, :scale => 2, :default => 0.0, :null => false
    t.integer  "source_id"
    t.string   "source_type"
    t.integer  "payment_method_id"
    t.string   "state"
    t.string   "response_code"
    t.string   "avs_response"
  end

  create_table "preferences", :force => true do |t|
    t.string   "key",                      :null => false
    t.string   "value_type", :limit => 50
    t.string   "value"
    t.datetime "created_at",               :null => false
    t.datetime "updated_at",               :null => false
  end

  add_index "preferences", ["key"], :name => "index_preferences_on_key", :unique => true

  create_table "product_groups", :force => true do |t|
    t.string  "name"
    t.string  "permalink"
    t.string  "order"
    t.integer "site_id"
  end

  add_index "product_groups", ["name"], :name => "index_product_groups_on_name"
  add_index "product_groups", ["permalink"], :name => "index_product_groups_on_permalink"
  add_index "product_groups", ["site_id"], :name => "index_product_groups_on_site_id"

  create_table "product_groups_products", :id => false, :force => true do |t|
    t.integer "product_id"
    t.integer "product_group_id"
  end

  create_table "product_option_types", :force => true do |t|
    t.integer  "product_id"
    t.integer  "option_type_id"
    t.integer  "position"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "product_properties", :force => true do |t|
    t.integer  "product_id"
    t.integer  "property_id"
    t.string   "presentation"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "product_properties", ["product_id"], :name => "index_product_properties_on_product_id"

  create_table "product_property_translations", :force => true do |t|
    t.integer  "product_property_id"
    t.string   "locale"
    t.string   "presentation"
    t.datetime "created_at",          :null => false
    t.datetime "updated_at",          :null => false
  end

  add_index "product_property_translations", ["locale"], :name => "index_product_property_translations_on_locale"
  add_index "product_property_translations", ["product_property_id"], :name => "index_827806ffd4778407c35215189d8230bca632b9b7"

  create_table "product_scopes", :force => true do |t|
    t.integer "product_group_id"
    t.string  "name"
    t.text    "arguments"
  end

  add_index "product_scopes", ["name"], :name => "index_product_scopes_on_name"
  add_index "product_scopes", ["product_group_id"], :name => "index_product_scopes_on_product_group_id"

  create_table "product_translations", :force => true do |t|
    t.integer  "product_id"
    t.string   "locale"
    t.string   "meta_description"
    t.string   "title"
    t.string   "meta_title"
    t.string   "slug"
    t.text     "body"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  add_index "product_translations", ["locale"], :name => "index_product_translations_on_locale"
  add_index "product_translations", ["product_id"], :name => "index_product_translations_on_product_id"

  create_table "products", :force => true do |t|
    t.string   "title",                :default => "",    :null => false
    t.text     "body"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "slug"
    t.datetime "available_on"
    t.integer  "section_id"
    t.integer  "tax_category_id"
    t.integer  "shipping_category_id"
    t.datetime "deleted_at"
    t.string   "meta_title"
    t.string   "meta_description"
    t.boolean  "variants_listed",      :default => false
    t.integer  "count_on_hand",        :default => 0,     :null => false
    t.integer  "site_id"
  end

  add_index "products", ["available_on"], :name => "index_products_on_available_on"
  add_index "products", ["deleted_at"], :name => "index_products_on_deleted_at"
  add_index "products", ["section_id"], :name => "index_products_on_section"
  add_index "products", ["site_id"], :name => "index_products_on_site_id"
  add_index "products", ["slug"], :name => "index_products_on_slug"
  add_index "products", ["title"], :name => "index_products_on_title"

  create_table "products_promotion_rules", :id => false, :force => true do |t|
    t.integer "product_id"
    t.integer "promotion_rule_id"
  end

  add_index "products_promotion_rules", ["product_id"], :name => "index_products_promotion_rules_on_product_id"
  add_index "products_promotion_rules", ["promotion_rule_id"], :name => "index_products_promotion_rules_on_promotion_rule_id"

  create_table "promotion_action_line_items", :force => true do |t|
    t.integer "promotion_action_id"
    t.integer "variant_id"
    t.integer "quantity",            :default => 1
  end

  create_table "promotion_actions", :force => true do |t|
    t.integer "activator_id"
    t.integer "position"
    t.string  "type"
  end

  create_table "promotion_rules", :force => true do |t|
    t.integer  "activator_id"
    t.integer  "user_id"
    t.integer  "product_group_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "type"
  end

  add_index "promotion_rules", ["product_group_id"], :name => "index_promotion_rules_on_product_group_id"
  add_index "promotion_rules", ["user_id"], :name => "index_promotion_rules_on_user_id"

  create_table "promotion_rules_users", :id => false, :force => true do |t|
    t.integer "user_id"
    t.integer "promotion_rule_id"
  end

  add_index "promotion_rules_users", ["promotion_rule_id"], :name => "index_promotion_rules_users_on_promotion_rule_id"
  add_index "promotion_rules_users", ["user_id"], :name => "index_promotion_rules_users_on_user_id"

  create_table "properties", :force => true do |t|
    t.string   "name"
    t.string   "presentation", :null => false
    t.integer  "site_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "properties", ["site_id"], :name => "index_properties_on_site_id"

  create_table "properties_prototypes", :id => false, :force => true do |t|
    t.integer "prototype_id"
    t.integer "property_id"
  end

  create_table "property_translations", :force => true do |t|
    t.integer  "property_id"
    t.string   "locale"
    t.string   "presentation"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  add_index "property_translations", ["locale"], :name => "index_property_translations_on_locale"
  add_index "property_translations", ["property_id"], :name => "index_property_translations_on_property_id"

  create_table "prototypes", :force => true do |t|
    t.string   "name"
    t.integer  "site_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "prototypes", ["site_id"], :name => "index_prototypes_on_site_id"

  create_table "return_authorizations", :force => true do |t|
    t.string   "number"
    t.decimal  "amount",     :precision => 8, :scale => 2, :default => 0.0, :null => false
    t.integer  "order_id"
    t.text     "reason"
    t.string   "state"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "roles", :force => true do |t|
    t.string "name"
  end

  create_table "roles_users", :id => false, :force => true do |t|
    t.integer "role_id"
    t.integer "user_id"
  end

  add_index "roles_users", ["role_id"], :name => "index_roles_users_on_role_id"
  add_index "roles_users", ["user_id"], :name => "index_roles_users_on_user_id"

  create_table "section_translations", :force => true do |t|
    t.integer  "section_id"
    t.string   "locale"
    t.string   "path"
    t.text     "body"
    t.string   "menu_title"
    t.string   "meta_title"
    t.string   "title"
    t.string   "slug"
    t.text     "meta_description"
    t.string   "title_addon"
    t.string   "redirect_url"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  add_index "section_translations", ["locale"], :name => "index_section_translations_on_locale"
  add_index "section_translations", ["section_id"], :name => "index_section_translations_on_section_id"

  create_table "sections", :force => true do |t|
    t.integer  "site_id"
    t.integer  "parent_id"
    t.integer  "link_id"
    t.string   "link_type"
    t.integer  "lft"
    t.integer  "rgt"
    t.string   "type"
    t.string   "name"
    t.string   "slug"
    t.string   "path"
    t.text     "options"
    t.string   "title"
    t.string   "layout"
    t.text     "body"
    t.string   "meta_title"
    t.text     "meta_description"
    t.string   "redirect_url"
    t.string   "title_addon"
    t.datetime "published_at"
    t.boolean  "hidden",            :default => false
    t.datetime "created_at",                           :null => false
    t.datetime "updated_at",                           :null => false
    t.string   "menu_title"
    t.integer  "level"
    t.boolean  "shallow_permalink", :default => true
    t.boolean  "no_follow"
  end

  add_index "sections", ["link_id", "link_type"], :name => "index_sections_on_link_id_and_link_type"
  add_index "sections", ["parent_id"], :name => "index_sections_on_parent_id"
  add_index "sections", ["site_id"], :name => "index_sections_on_site_id"

  create_table "shipments", :force => true do |t|
    t.integer  "order_id"
    t.integer  "shipping_method_id"
    t.string   "tracking"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "number"
    t.decimal  "cost",               :precision => 8, :scale => 2
    t.datetime "shipped_at"
    t.integer  "address_id"
    t.string   "state"
  end

  add_index "shipments", ["number"], :name => "index_shipments_on_number"

  create_table "shipping_categories", :force => true do |t|
    t.string   "name"
    t.integer  "site_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "shipping_categories", ["site_id"], :name => "index_shipping_categories_on_site_id"

  create_table "shipping_methods", :force => true do |t|
    t.integer  "zone_id"
    t.string   "name"
    t.integer  "site_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "display_on"
    t.integer  "shipping_category_id"
    t.boolean  "match_none"
    t.boolean  "match_all"
    t.boolean  "match_one"
  end

  add_index "shipping_methods", ["site_id"], :name => "index_shipping_methods_on_site_id"

  create_table "site_registrations", :force => true do |t|
    t.integer "user_id"
    t.integer "site_id"
  end

  add_index "site_registrations", ["user_id", "site_id"], :name => "index_site_registrations_on_user_id_and_site_id"

  create_table "site_translations", :force => true do |t|
    t.integer  "site_id"
    t.string   "locale"
    t.string   "meta_title"
    t.string   "title"
    t.string   "subtitle"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "site_translations", ["locale"], :name => "index_site_translations_on_locale"
  add_index "site_translations", ["site_id"], :name => "index_site_translations_on_site_id"

  create_table "sites", :force => true do |t|
    t.integer  "account_id"
    t.string   "host"
    t.string   "title"
    t.string   "meta_title"
    t.string   "subtitle"
    t.string   "timezone"
    t.string   "locales",                  :limit => 17
    t.boolean  "public",                                 :default => true
    t.text     "options"
    t.datetime "created_at",                                               :null => false
    t.datetime "updated_at",                                               :null => false
    t.text     "plugins"
    t.integer  "site_registrations_count",               :default => 0
    t.integer  "theme_id"
    t.string   "logo_mime_type"
    t.string   "logo_name"
    t.integer  "logo_size"
    t.integer  "logo_width"
    t.integer  "logo_height"
    t.string   "logo_uid"
    t.string   "logo_ext"
    t.string   "default_image_uid"
  end

  add_index "sites", ["account_id"], :name => "index_sites_on_account_id"
  add_index "sites", ["host"], :name => "index_sites_on_host", :unique => true
  add_index "sites", ["theme_id"], :name => "index_sites_on_theme_id"

  create_table "state_changes", :force => true do |t|
    t.integer  "stateful_id"
    t.integer  "user_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "previous_state"
    t.string   "stateful_type"
    t.string   "next_state"
  end

  create_table "state_events", :force => true do |t|
    t.integer  "stateful_id"
    t.integer  "user_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "previous_state"
    t.string   "stateful_type"
    t.string   "next_state"
  end

  create_table "states", :force => true do |t|
    t.string  "name"
    t.string  "abbr"
    t.integer "country_id"
  end

  add_index "states", ["country_id"], :name => "index_states_on_country_id"

  create_table "sticker_translations", :force => true do |t|
    t.integer  "sticker_id"
    t.string   "locale"
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "sticker_translations", ["locale"], :name => "index_sticker_translations_on_locale"
  add_index "sticker_translations", ["sticker_id"], :name => "index_sticker_translations_on_sticker_id"

  create_table "stickers", :force => true do |t|
    t.string   "name"
    t.integer  "site_id"
    t.integer  "section_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "stickers", ["name"], :name => "index_stickers_on_name"
  add_index "stickers", ["site_id", "section_id"], :name => "index_stickers_on_site_id_and_section_id"

  create_table "stickings", :force => true do |t|
    t.integer  "sticker_id"
    t.integer  "stickable_id"
    t.string   "stickable_type"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  add_index "stickings", ["stickable_id", "stickable_type"], :name => "index_stickings_on_stickable_id_and_stickable_type"
  add_index "stickings", ["sticker_id"], :name => "index_stickings_on_sticker_id"

  create_table "supports", :force => true do |t|
    t.integer "owner_id"
    t.string  "owner_type"
    t.text    "infos"
  end

  add_index "supports", ["owner_id", "owner_type"], :name => "index_supports_on_owner_id_and_owner_type", :unique => true

  create_table "tax_categories", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.integer  "site_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "is_default",  :default => false
  end

  add_index "tax_categories", ["site_id"], :name => "index_tax_categories_on_site_id"

  create_table "tax_rates", :force => true do |t|
    t.integer  "zone_id"
    t.decimal  "amount",            :precision => 8, :scale => 4
    t.integer  "site_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "tax_category_id"
    t.boolean  "included_in_price",                               :default => false
  end

  add_index "tax_rates", ["site_id"], :name => "index_tax_rates_on_site_id"

  create_table "themes", :force => true do |t|
    t.integer  "site_id"
    t.string   "name"
    t.string   "theme_id"
    t.string   "author"
    t.string   "version"
    t.string   "homepage"
    t.text     "summary"
    t.integer  "active"
    t.string   "document_mime_type"
    t.string   "document_name"
    t.integer  "document_size"
    t.string   "document_uid"
    t.string   "document_ext"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.text     "settings"
  end

  create_table "tokenized_permissions", :force => true do |t|
    t.integer  "permissable_id"
    t.string   "permissable_type"
    t.string   "token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tokenized_permissions", ["permissable_id", "permissable_type"], :name => "index_tokenized_name_and_type"

  create_table "trackers", :force => true do |t|
    t.string   "environment"
    t.string   "analytics_id"
    t.boolean  "active",       :default => true
    t.integer  "site_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "trackers", ["site_id"], :name => "index_trackers_on_site_id"

  create_table "users", :force => true do |t|
    t.integer  "account_id"
    t.string   "email",                                   :default => "", :null => false
    t.string   "encrypted_password",       :limit => 128, :default => "", :null => false
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "reset_password_token"
    t.string   "remember_created_at"
    t.integer  "sign_in_count",                           :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "username",                 :limit => 60
    t.string   "firstname",                :limit => 60
    t.string   "lastname",                 :limit => 60
    t.string   "preferred_language",       :limit => 5
    t.string   "timezone"
    t.integer  "site_registrations_count",                :default => 0
    t.datetime "created_at",                                              :null => false
    t.datetime "updated_at",                                              :null => false
    t.string   "password_salt"
    t.string   "persistence_token"
    t.string   "perishable_token"
    t.integer  "failed_attempts",                         :default => 0,  :null => false
    t.datetime "last_request_at"
    t.string   "login"
    t.string   "authentication_token"
    t.string   "unlock_token"
    t.datetime "locked_at"
    t.integer  "ship_address_id"
    t.integer  "bill_address_id"
    t.datetime "reset_password_sent_at"
  end

  add_index "users", ["account_id"], :name => "index_users_on_account_id"
  add_index "users", ["persistence_token"], :name => "index_users_on_persistence_token"

  create_table "variant_translations", :force => true do |t|
    t.integer  "variant_id"
    t.string   "locale"
    t.string   "alt_title"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "variant_translations", ["locale"], :name => "index_variant_translations_on_locale"
  add_index "variant_translations", ["variant_id"], :name => "index_variant_translations_on_variant_id"

  create_table "variants", :force => true do |t|
    t.integer  "product_id"
    t.string   "sku",                                         :default => "",    :null => false
    t.decimal  "price",         :precision => 8, :scale => 2,                    :null => false
    t.decimal  "weight",        :precision => 8, :scale => 2
    t.decimal  "height",        :precision => 8, :scale => 2
    t.decimal  "width",         :precision => 8, :scale => 2
    t.decimal  "depth",         :precision => 8, :scale => 2
    t.datetime "deleted_at"
    t.boolean  "is_master",                                   :default => false
    t.integer  "count_on_hand",                               :default => 0,     :null => false
    t.decimal  "cost_price",    :precision => 8, :scale => 2
    t.integer  "position"
    t.string   "alt_title"
  end

  add_index "variants", ["product_id"], :name => "index_variants_on_product_id"

  create_table "zone_members", :force => true do |t|
    t.integer  "zone_id"
    t.integer  "zoneable_id"
    t.string   "zoneable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "zones", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.integer  "site_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "default_tax", :default => false
  end

  add_index "zones", ["site_id"], :name => "index_zones_on_site_id"

end
