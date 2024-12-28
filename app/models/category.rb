class Category < ApplicationRecord
  belongs_to :company

  validates :name,
            presence: true,
            uniqueness: { scope: :company_id },
            length: { maximum: 50 }
  validates :description, length: { maximum: 500 }

  scope :sorted, -> { order(:name) }
end
