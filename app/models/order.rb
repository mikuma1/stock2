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
  validate :validate_status_transition, if: :status_changed?

  def receive!
    return false if received?

    transaction do
      update!(status: :received, received_at: Time.current)
      create_stock_history!
      true
    end
  end

  def receive_stock!
    return if receive!

    errors.add(:base, :unexpected_error)
    raise ActiveRecord::RecordInvalid, self
  end

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

    errors.add(:status, :invalid)
  end

  def create_stock_history!
    item.stocks.create!(
      quantity: quantity,
      operation_type: :addition,
      note: "発注品受領 (発注ID: #{id})",
      user: approver,
      company: company
    )
  end
end
