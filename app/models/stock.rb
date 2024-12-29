class Stock < ApplicationRecord
  belongs_to :item
  belongs_to :company
  belongs_to :user

  validates :quantity, presence: true, numericality: { only_integer: true }
  validates :operation_type, presence: true
  validates :operated_at, presence: true
  validates :note, length: { maximum: 500 }

  enum operation_type: {
    initial: 0,
    addition: 1,
    subtraction: 2
  }

  before_validation :set_operated_at

  private

  def set_operated_at
    self.operated_at ||= Time.current
  end
end
