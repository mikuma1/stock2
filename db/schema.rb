# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_12_29_133925) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id", "name"], name: "index_categories_on_company_id_and_name", unique: true
    t.index ["company_id"], name: "index_categories_on_company_id"
  end

  create_table "companies", force: :cascade do |t|
    t.string "name", null: false
    t.text "address"
    t.string "phone_number"
    t.string "subdomain", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_companies_on_name", unique: true
    t.index ["subdomain"], name: "index_companies_on_subdomain", unique: true
  end

  create_table "departments", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id", "name"], name: "index_departments_on_company_id_and_name", unique: true
    t.index ["company_id"], name: "index_departments_on_company_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "minimum_quantity"
    t.string "unit"
    t.string "url"
    t.text "purchase_notes"
    t.bigint "category_id", null: false
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_items_on_category_id"
    t.index ["company_id"], name: "index_items_on_company_id"
    t.index ["name", "company_id"], name: "index_items_on_name_and_company_id", unique: true
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "item_id", null: false
    t.bigint "company_id", null: false
    t.bigint "user_id", null: false
    t.bigint "approver_id"
    t.integer "quantity", null: false
    t.string "status", default: "pending", null: false
    t.text "note"
    t.datetime "ordered_at"
    t.datetime "received_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["approver_id"], name: "index_orders_on_approver_id"
    t.index ["company_id"], name: "index_orders_on_company_id"
    t.index ["item_id"], name: "index_orders_on_item_id"
    t.index ["status"], name: "index_orders_on_status"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "stocks", force: :cascade do |t|
    t.bigint "item_id", null: false
    t.bigint "company_id", null: false
    t.bigint "user_id", null: false
    t.integer "quantity", null: false
    t.integer "operation_type", default: 0, null: false
    t.text "note"
    t.datetime "operated_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id", "operated_at"], name: "index_stocks_on_company_id_and_operated_at"
    t.index ["company_id"], name: "index_stocks_on_company_id"
    t.index ["item_id", "operated_at"], name: "index_stocks_on_item_id_and_operated_at"
    t.index ["item_id"], name: "index_stocks_on_item_id"
    t.index ["user_id"], name: "index_stocks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.bigint "company_id", null: false
    t.integer "role", default: 1
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "department_id"
    t.string "name", default: "", null: false
    t.index ["company_id"], name: "index_users_on_company_id"
    t.index ["department_id"], name: "index_users_on_department_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "categories", "companies"
  add_foreign_key "departments", "companies"
  add_foreign_key "items", "categories"
  add_foreign_key "items", "companies"
  add_foreign_key "orders", "companies"
  add_foreign_key "orders", "items"
  add_foreign_key "orders", "users"
  add_foreign_key "orders", "users", column: "approver_id"
  add_foreign_key "stocks", "companies"
  add_foreign_key "stocks", "items"
  add_foreign_key "stocks", "users"
  add_foreign_key "users", "companies"
  add_foreign_key "users", "departments"
end
