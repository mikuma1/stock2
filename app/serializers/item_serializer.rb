class ItemSerializer < ApplicationSerializer
  attributes :id,
             :name,
             :description,
             :minimum_quantity,
             :stock_quantity,
             :unit,
             :url,
             :purchase_notes,
             :category_id,
             :company_id,
             :created_at,
             :updated_at

  belongs_to :category
  belongs_to :company
  has_many :stocks
end
