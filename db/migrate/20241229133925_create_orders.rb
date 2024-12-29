class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.references :item, null: false, foreign_key: true
      t.references :company, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.references :approver, foreign_key: { to_table: :users }
      t.integer :quantity, null: false
      t.string :status, null: false, default: 'pending'
      t.text :note
      t.datetime :ordered_at
      t.datetime :received_at

      t.timestamps
    end

    add_index :orders, :status
  end
end
