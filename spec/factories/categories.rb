FactoryBot.define do
  factory :category do
    sequence(:name) { |n| "カテゴリー#{n}" }
    sequence(:description) { |n| "カテゴリー#{n}の説明文です" }
    association :company

    trait :with_items do
      after(:create) do |category|
        create_list(:item, 3, category: category)
      end
    end
  end
end
