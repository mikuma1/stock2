FactoryBot.define do
  factory :department do
    sequence(:name) { |n| "部署#{n}" }
    description { "部署の説明文です" }
    association :company
  end
end
