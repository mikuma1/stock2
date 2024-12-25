class CreateDepartments < ActiveRecord::Migration[7.0]
  def change
    create_table :departments do |t|
      t.string :name, null: false
      t.text :description
      t.references :company, null: false, foreign_key: true

      t.timestamps
    end

    add_index :departments, %i[company_id name], unique: true
  end
end
