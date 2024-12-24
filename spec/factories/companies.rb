FactoryBot.define do
  factory :company do
    company_name { Faker::Company.name }
    address { Faker::Address.full_address }
    phone_number { Faker::PhoneNumber.phone_number }
    subdomain { Faker::Internet.unique.domain_word }
  end
end
