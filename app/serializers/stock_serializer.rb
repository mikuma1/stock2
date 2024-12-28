class StockSerializer < ApplicationSerializer
  attributes :id,
             :item_id,
             :company_id,
             :user_id,
             :quantity,
             :operation_type,
             :note,
             :operated_at,
             :created_at,
             :updated_at

  belongs_to :item
  belongs_to :company
  belongs_to :user
end
