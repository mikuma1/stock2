class Category < ApplicationRecord
  belongs_to :company
  has_many :items, dependent: :restrict_with_error

  validates :name,
            presence: true,
            length: { maximum: 50 },
            uniqueness: { scope: :company_id }
  validates :description,
            length: { maximum: 500 },
            allow_blank: true

  scope :sorted, -> { order(:name) }
end
