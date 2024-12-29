class Order < ApplicationRecord
  belongs_to :item
  belongs_to :company
  belongs_to :user
  belongs_to :approver, class_name: 'User', optional: true

  enum status: {
    pending: 'pending',      # 申請中
    approved: 'approved',    # 承認済み
    rejected: 'rejected',    # 却下
    ordered: 'ordered',      # 発注済み
    received: 'received'     # 受領済み
  }

  validates :quantity, presence: true, numericality: { greater_than: 0 }
  validates :status, presence: true
  validates :note, length: { maximum: 500 }
  validates :approver, presence: true, if: -> { approved? || rejected? || ordered? || received? }

  validate :validate_status_transition, if: :will_save_change_to_status?

  private

  def validate_status_transition
    return if status_was.nil?

    allowed_transitions = {
      'pending' => %w[approved rejected],
      'approved' => %w[ordered rejected],
      'ordered' => %w[received],
      'rejected' => %w[pending],
      'received' => []
    }

    return if allowed_transitions[status_was]&.include?(status)

    errors.add(:status, :invalid_transition, from: status_was, to: status)
  end
end
