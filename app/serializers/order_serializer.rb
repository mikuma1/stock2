class OrderSerializer < ApplicationSerializer
  attributes :id,
             :quantity,
             :status,
             :note,
             :ordered_at,
             :received_at,
             :created_at,
             :updated_at

  belongs_to :item
  belongs_to :user
  belongs_to :approver, optional: true

  attribute :item_name do |object|
    object.item.name
  end

  attribute :user_name do |object|
    object.user.name
  end

  attribute :approver_name do |object|
    object.approver&.name
  end

  attribute :status_text do |object|
    I18n.t("enums.order.status.#{object.status}")
  end
end
