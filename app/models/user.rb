class User < ApplicationRecord
  belongs_to :company
  belongs_to :department, optional: true

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum :role, { admin: 0, user: 1 }

  validates :role, presence: true
  validates :department, presence: true, if: :require_department?

  def admin?
    role == 'admin'
  end

  private

  def require_department?
    role != 'admin'
  end
end
