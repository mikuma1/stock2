FactoryBot.define do
  factory :order do
    association :item
    association :company
    association :user
    quantity { 1 }
    note { 'テスト発注' }
    status { :pending }

    trait :pending do
      status { :pending }
    end

    trait :approved do
      after(:create) do |order|
        order.approver = create(:user, :admin, company: order.company)
        order.update!(status: :approved)
      end
    end

    trait :ordered do
      after(:create) do |order|
        order.approver = create(:user, :admin, company: order.company)
        order.update!(status: :approved)
        order.update!(status: :ordered, ordered_at: Time.current)
      end
    end

    trait :received do
      after(:create) do |order|
        order.approver = create(:user, :admin, company: order.company)
        order.update!(status: :approved)
        order.update!(status: :ordered, ordered_at: Time.current)
        order.update!(status: :received, received_at: Time.current)
      end
    end

    trait :rejected do
      after(:create) do |order|
        order.approver = create(:user, :admin, company: order.company)
        order.update!(status: :rejected)
      end
    end
  end
end
