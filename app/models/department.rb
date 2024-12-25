class Department < ApplicationRecord
  belongs_to :company
  has_many :users, dependent: :restrict_with_error

  validates :name,
            presence: true,
            uniqueness: { scope: :company_id },
            length: { maximum: 50 }
  validates :description, length: { maximum: 500 }

  scope :sorted, -> { order(:name) }

  validate :ensure_no_users_before_destroy, on: :destroy

  private

  def ensure_no_users_before_destroy
    if users.exists?
      errors.add(:base, 'ユーザーが所属している部署は削除できません')
    end
  end
end
