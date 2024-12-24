class CreateInitialTables < ActiveRecord::Migration[7.0]
  def change
    # 企業テーブル
    create_table :companies do |t|
      t.string :company_name, null: false
      t.text :address
      t.string :phone_number
      t.string :subdomain, null: false
      
      t.timestamps
    end

    add_index :companies, :subdomain, unique: true

    # ユーザーテーブル
    create_table :users do |t|
      ## Database authenticatable
      t.string :email, null: false, default: ""
      t.string :encrypted_password, null: false, default: ""
      t.references :company, null: false, foreign_key: true
      t.integer :role, default: 1  # 1 = user（デフォルト値）

      ## Recoverable
      t.string :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      t.timestamps null: false
    end

    add_index :users, :email, unique: true
    add_index :users, :reset_password_token, unique: true
  end
end