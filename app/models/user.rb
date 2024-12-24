class User < ApplicationRecord
  belongs_to :company
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum role: { admin: 0, user: 1 }

  validates :role, presence: true
end
