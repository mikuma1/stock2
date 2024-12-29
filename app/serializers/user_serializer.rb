class UserSerializer < ApplicationSerializer
  attributes :id, :email, :name, :role, :company_id, :created_at, :updated_at

  belongs_to :company
end
