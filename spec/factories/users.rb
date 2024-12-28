FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    password { 'password' }
    role { :user }
    association :company
    association :department

    trait :admin do
      role { :admin }
      department { nil }
    end
  end
end
