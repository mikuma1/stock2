FactoryBot.define do
  factory :item do
    sequence(:name) { |n| "消耗品#{n}" }
    sequence(:description) { |n| "消耗品#{n}の説明文です" }
    minimum_quantity { 10 }
    unit { '個' }
    sequence(:url) { |n| "https://example.com/items/#{n}" }
    sequence(:purchase_notes) { |n| "購入時の注意事項#{n}" }
    association :category
    association :company
  end
end
