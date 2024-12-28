class Company < ApplicationRecord
  has_many :users, dependent: :destroy
  has_many :departments, dependent: :destroy
  has_many :categories, dependent: :destroy

  validates :company_name, presence: true
  validates :phone_number, presence: true
  validates :subdomain, presence: true, uniqueness: true
end
