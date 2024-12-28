class AddUniqueIndexToItemsName < ActiveRecord::Migration[7.0]
  def change
    add_index :items, [:name, :company_id], unique: true
  end
end
