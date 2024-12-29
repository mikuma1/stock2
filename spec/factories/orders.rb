FactoryBot.define do
  factory :order do
    association :item
    association :company
    association :user
    association :approver, factory: :user, role: :admin
    quantity { rand(1..100) }
    status { 'pending' }
    note { 'テスト発注' }

    trait :approved do
      after(:create) do |order|
        order.approver ||= create(:user, :admin, company: order.company)
        order.update!(status: 'approved')
      end
    end

    trait :rejected do
      after(:create) do |order|
        order.approver ||= create(:user, :admin, company: order.company)
        order.update!(status: 'rejected')
      end
    end

    trait :ordered do
      after(:create) do |order|
        order.approver ||= create(:user, :admin, company: order.company)
        order.update!(status: 'approved')
        order.update!(status: 'ordered', ordered_at: Time.current)
      end
    end

    trait :received do
      after(:create) do |order|
        order.approver ||= create(:user, :admin, company: order.company)
        order.update!(status: 'approved')
        order.update!(status: 'ordered', ordered_at: 1.day.ago)
        order.update!(status: 'received', received_at: Time.current)
      end
    end
  end
end
