class Stock < ApplicationRecord
  belongs_to :item
  belongs_to :company
  belongs_to :user
end
