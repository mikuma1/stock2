FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.email }
    password { 'password123' }
    role { 1 }
    association :company

    trait :admin do
      role { 0 }
    end
  end
end
