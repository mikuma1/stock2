class OrderSerializer < ApplicationSerializer
  attributes :id,
             :quantity,
             :status,
             :note,
             :ordered_at,
             :received_at,
             :created_at,
             :updated_at,
             :item_name,
             :user_name,
             :approver_name,
             :status_text

  belongs_to :item, serializer: ItemSerializer
  belongs_to :user, serializer: UserSerializer
  belongs_to :approver, serializer: UserSerializer, optional: true

  def item_name
    object.item&.name
  end

  def user_name
    object.user&.name
  end

  def approver_name
    object.approver&.name
  end

  def status_text
    I18n.t("enums.order.status.#{object.status}")
  end

  def created_at
    object.created_at&.as_json
  end

  def updated_at
    object.updated_at&.as_json
  end

  def ordered_at
    object.ordered_at&.as_json
  end

  def received_at
    object.received_at&.as_json
  end
end
