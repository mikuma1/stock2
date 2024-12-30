class AddStockQuantityToItems < ActiveRecord::Migration[7.0]
  def change
    add_column :items, :stock_quantity, :integer, null: false, default: 0
  end
end
