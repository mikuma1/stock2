class CategorySerializer < ApplicationSerializer
  attributes :id, :name, :description, :company_id, :created_at, :updated_at

  belongs_to :company
  has_many :items
end
