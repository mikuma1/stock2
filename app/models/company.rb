class Company < ApplicationRecord
  has_many :users, dependent: :destroy
  has_many :departments, dependent: :destroy
  has_many :items, dependent: :destroy
  has_many :categories, dependent: :destroy
  has_many :stocks, dependent: :destroy

  validates :company_name, presence: true
  validates :phone_number, presence: true
  validates :subdomain,
            presence: true,
            uniqueness: { case_sensitive: false },
            format: {
              with: /\A[a-z0-9]+(?:-[a-z0-9]+)*\z/,
              message: :invalid_subdomain_format
            }
end
