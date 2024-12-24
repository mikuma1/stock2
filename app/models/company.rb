class Company < ApplicationRecord
  has_many :users
  
  validates :company_name, presence: true
  validates :phone_number, presence: true
  validates :subdomain, presence: true, uniqueness: true
end 