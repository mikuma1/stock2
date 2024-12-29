class User < ApplicationRecord
  has_many :stocks, dependent: :restrict_with_error
  belongs_to :company
  belongs_to :department, optional: true
  has_many :orders, dependent: :restrict_with_error
  has_many :approved_orders,
           class_name: 'Order',
           foreign_key: 'approver_id',
           inverse_of: :approver,
           dependent: :restrict_with_error

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum role: { admin: 0, user: 1 }

  validates :email, presence: true
  validates :password, presence: true, on: :create
  validates :role, presence: true
  validates :department, presence: true, unless: :admin?
end
