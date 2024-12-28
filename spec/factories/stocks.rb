FactoryBot.define do
  factory :stock do
    item { nil }
    company { nil }
    user { nil }
    quantity { 1 }
    operation_type { 1 }
    note { "MyText" }
    operated_at { "2024-12-28 17:38:51" }
  end
end
