class Item < ApplicationRecord
  belongs_to :category
  belongs_to :company
  has_many :stocks, dependent: :destroy
  has_many :orders, dependent: :restrict_with_error

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
  validates :stock_quantity,
            presence: true,
            numericality: {
              only_integer: true,
              greater_than_or_equal_to: 0
            }

  scope :sorted, -> { order(:name) }

  def stock_history
    stocks.order(operated_at: :desc)
  end

  def update_stock_quantity!(quantity:, operation_type:)
    transaction do
      new_quantity = case operation_type.to_s
                     when 'addition' then stock_quantity + quantity
                     when 'subtraction' then stock_quantity - quantity
                     else
                       raise ArgumentError, "Invalid operation_type: #{operation_type}"
                     end

      if new_quantity.negative?
        errors.add(:stock_quantity, :insufficient_stock)
        raise ActiveRecord::RecordInvalid, self
      end

      stocks.create!(
        quantity: operation_type.to_s == 'addition' ? quantity : -quantity,
        operated_at: Time.current,
        company: company,
        user: Current.user
      )

      update!(stock_quantity: new_quantity)
    end
  end
end
