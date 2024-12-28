class CreateStocks < ActiveRecord::Migration[7.0]
  def change
    create_table :stocks do |t|
      t.references :item, null: false, foreign_key: true
      t.references :company, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.integer :quantity, null: false
      t.integer :operation_type, null: false, default: 0
      t.text :note
      t.datetime :operated_at, null: false

      t.timestamps

      t.index [:item_id, :operated_at]
      t.index [:company_id, :operated_at]
    end
  end
end
