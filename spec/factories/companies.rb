FactoryBot.define do
  factory :company do
    sequence(:name) { |n| "テスト企業#{n}" }
    sequence(:subdomain) { |n| "test-company-#{n}" }
    phone_number { '03-1234-5678' }
  end
end
