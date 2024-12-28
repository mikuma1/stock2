FactoryBot.define do
  factory :stock do
    association :item
    association :company
    association :user
    quantity { 10 }
    operation_type { :initial }
    note { '初期在庫' }
    operated_at { Time.current }
  end
end
