# This migration comes from gko_store (originally 20120823184800)
class RemoveStoreUnusedTables < ActiveRecord::Migration
  def up
    drop_table :product_scopes if table_exists?(:product_scopes)
    drop_table :product_groups if table_exists?(:product_groups)
    drop_table :product_groups_products if table_exists?(:product_groups_products)
    drop_table :trackers if table_exists?(:trackers)
    drop_table :state_events if table_exists?(:state_events)
    drop_table :products_promotion_rules if table_exists?(:products_promotion_rules)
    drop_table :promotion_action_line_items if table_exists?(:promotion_action_line_items)
    drop_table :promotion_actions if table_exists?(:promotion_actions)
    drop_table :promotion_rules if table_exists?(:promotion_rules)
    drop_table :promotion_rules_users if table_exists?(:promotion_rules_users)
  end
end