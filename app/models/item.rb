class Item < ApplicationRecord
  belongs_to :category
  belongs_to :company
  has_many :stocks, dependent: :destroy
  has_many :orders, dependent: :destroy

  validates :name,
            presence: true,
            uniqueness: { scope: :company_id },
            length: { maximum: 100 }
  validates :minimum_quantity,
            numericality: { greater_than_or_equal_to: 0 },
            allow_nil: true
  validates :unit, length: { maximum: 20 }
  validates :url, format: { with: URI::DEFAULT_PARSER.make_regexp }, allow_blank: true
  validates :purchase_notes, length: { maximum: 1000 }

  scope :sorted, -> { order(:name) }

  def current_stock
    stocks.sum(:quantity)
  end

  def stock_history
    stocks.order(operated_at: :desc)
  end

  def update_stock_quantity!(quantity:, operation_type:)
    transaction do
      new_quantity = operation_type == 'addition' ? stock_quantity + quantity : stock_quantity - quantity

      if new_quantity.negative?
        errors.add(:stock_quantity, :insufficient_stock)
        raise ActiveRecord::RecordInvalid, self
      end

      update!(stock_quantity: new_quantity)
    end
  end
end
