class User < ApplicationRecord
  belongs_to :company
  belongs_to :department, optional: true

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum role: { admin: 0, user: 1 }

  validates :email, presence: true
  validates :password, presence: true, on: :create
  validates :role, presence: true
  validates :department, presence: true, unless: :admin?
end
