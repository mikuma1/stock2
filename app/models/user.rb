class User < ApplicationRecord
  belongs_to :company
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
         
  enum role: %i[admin user]

  validates :role, presence: true
end
