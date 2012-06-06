class GkoCreateShop < ActiveRecord::Migration
  # This is a legacy migration of Gko 0.70.3
  def self.up

    add_column :users, :ship_address_id, :integer unless column_exists?(:users, :ship_address_id)
    add_column :users, :bill_address_id, :integer unless column_exists?(:users, :bill_address_id)
    
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
    end

    add_index "addresses", ["firstname"], :name => "index_addresses_on_firstname"
    add_index "addresses", ["lastname"], :name => "index_addresses_on_lastname"

    create_table "adjustments", :force => true do |t|
      t.integer  "order_id"
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
    end

    add_index "adjustments", ["order_id"], :name => "index_adjustments_on_order_id"

    create_table "calculators", :force => true do |t|
      t.string   "type"
      t.integer  "calculable_id",   :null => false
      t.string   "calculable_type", :null => false
      t.integer  "site_id"
      t.datetime "created_at"
      t.datetime "updated_at"
    end
    
    add_index "calculators", ["site_id"], :name => "index_calculators_on_site_id"

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

    create_table "log_entries", :force => true do |t|
      t.integer  "source_id"
      t.string   "source_type"
      t.text     "details"
      t.datetime "created_at"
      t.datetime "updated_at"
    end

    # Already in Gko
    #create_table "mail_methods", :force => true do |t|
    #  t.string   "environment"
    #  t.boolean  "active",      :default => true
    #  t.datetime "created_at"
    #  t.datetime "updated_at"
    #end

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


    create_table "product_groups", :force => true do |t|
      t.string "name"
      t.string "permalink"
      t.string "order"
      t.integer  "site_id"
    end
    add_index "product_groups", ["site_id"], :name => "index_product_groups_on_site_id"
    add_index "product_groups", ["name"], :name => "index_product_groups_on_name"
    add_index "product_groups", ["permalink"], :name => "index_product_groups_on_permalink"

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
      t.string   "value"
      t.datetime "created_at"
      t.datetime "updated_at"
    end

    add_index "product_properties", ["product_id"], :name => "index_product_properties_on_product_id"

    create_table "product_scopes", :force => true do |t|
      t.integer "product_group_id"
      t.string  "name"
      t.text    "arguments"
    end

    add_index "product_scopes", ["name"], :name => "index_product_scopes_on_name"
    add_index "product_scopes", ["product_group_id"], :name => "index_product_scopes_on_product_group_id"

    create_table "products", :force => true do |t|
      t.string   "title",                 :default => "", :null => false
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
      t.string   "meta_keywords"
      t.boolean  "variants_listed",      :default => false
      t.integer  "count_on_hand",        :default => 0,  :null => false
    end

    add_index "products", ["available_on"], :name => "index_products_on_available_on"
    add_index "products", ["deleted_at"], :name => "index_products_on_deleted_at"
    add_index "products", ["title"], :name => "index_products_on_title"
    add_index "products", ["slug"], :name => "index_products_on_slug"
    add_index "products", ["section_id"], :name => "index_products_on_section"

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
      t.integer "site_id"
      t.datetime "created_at"
      t.datetime "updated_at"
    end
    add_index "properties", ["site_id"], :name => "index_properties_on_site_id"
    
    create_table "properties_prototypes", :id => false, :force => true do |t|
      t.integer "prototype_id"
      t.integer "property_id"
    end

    create_table "prototypes", :force => true do |t|
      t.string   "name"
      t.integer "site_id"
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
    end
    add_index "shipping_methods", ["site_id"], :name => "index_shipping_methods_on_site_id"
    
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
      t.decimal  "amount",          :precision => 8, :scale => 4
      t.integer  "site_id"
      t.datetime "created_at"
      t.datetime "updated_at"
      t.integer  "tax_category_id"
    end
    add_index "tax_rates", ["site_id"], :name => "index_tax_rates_on_site_id"

    create_table "trackers", :force => true do |t|
      t.string   "environment"
      t.string   "analytics_id"
      t.boolean  "active",       :default => true
      t.integer  "site_id"
      t.datetime "created_at"
      t.datetime "updated_at"
    end
    add_index "trackers", ["site_id"], :name => "index_trackers_on_site_id"
    # Set in Gko-Auth
    #create_table "users", :force => true do |t|
    #  t.string   "email"
    #  t.string   "encrypted_password"
    #  t.string   "password_salt"
    #  t.string   "remember_token"
    #  t.datetime "created_at"
    #  t.datetime "updated_at"
    #  t.string   "persistence_token"
    #  t.string   "reset_password_token"
    #  t.string   "perishable_token"
    #  t.integer  "sign_in_count",                      :default => 0, :null => false
    #  t.integer  "failed_attempts",                    :default => 0, :null => false
    #  t.datetime "last_request_at"
    #  t.datetime "current_sign_in_at"
    #  t.datetime "last_sign_in_at"
    #  t.string   "current_sign_in_ip"
    #  t.string   "last_sign_in_ip"
    #  t.string   "login"
    #  t.integer  "ship_address_id"
    #  t.integer  "bill_address_id"
    #  t.string   "authentication_token"
    #  t.string   "unlock_token"
    #  t.datetime "locked_at"
    #  t.datetime "remember_created_at"
    #  t.string   "api_key",              :limit => 40
    #end

    #add_index "users", ["persistence_token"], :name => "index_users_on_persistence_token"

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
    end
    
    add_index "zones", ["site_id"], :name => "index_zones_on_site_id"
  end

  def self.down
    remove_column :users, :ship_address_id
    remove_column :users, :bill_address_id
    remove_table "activators"
    remove_table "addresses"
    remove_table "adjustments"
    remove_table "calculators"

    remove_table "creditcards"
    remove_table "gateways"
    remove_table "inventory_units"
    remove_table "line_items"
    remove_table "log_entries"
    remove_table "option_types"
    remove_table "option_types_prototypes"
    remove_table "option_values"
    remove_table "option_values_variants"
    remove_table "orders"
    remove_table "payment_methods"
    remove_table "payments"
    remove_table "product_groups"
    remove_table "product_groups_products"
    remove_table "product_option_types"
    remove_table "product_properties"
    remove_table "product_scopes"
    remove_table "products"
    remove_table "products_promotion_rules"
    remove_table "promotion_action_line_items"
    remove_table "promotion_actions"
    remove_table "promotion_rules"
    remove_table "promotion_rules_users"
    remove_table "properties"
    remove_table "properties_prototypes"
    remove_table "prototypes"
    remove_table "return_authorizations"
    remove_table "shipments"
    remove_table "shipping_categories"
    remove_table "shipping_methods"
    remove_table "state_events"
    remove_table "tax_categories"
    remove_table "tax_rates"
    remove_table "trackers"
    remove_table "variants"
    remove_table "zone_members"
    remove_table "zones"
  end
end
