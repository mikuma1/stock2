require 'rails_helper'

RSpec.describe Stock, type: :model do
  describe 'アソシエーション' do
    it { is_expected.to belong_to(:item) }
    it { is_expected.to belong_to(:company) }
    it { is_expected.to belong_to(:user) }
  end

  describe 'バリデーション' do
    let(:stock) { build(:stock) }

    it '有効なファクトリを持つこと' do
      expect(stock).to be_valid
    end

    it 'quantityが必須であること' do
      stock.quantity = nil
      expect(stock).not_to be_valid
    end

    it 'quantityが整数であること' do
      stock.quantity = 1.5
      expect(stock).not_to be_valid
    end

    it 'operation_typeが必須であること' do
      stock.operation_type = nil
      expect(stock).not_to be_valid
    end

    it 'operated_atが必須であること' do
      stock.operated_at = nil
      expect(stock).to be_valid
    end

    it 'noteが500文字以内であること' do
      stock.note = 'a' * 501
      expect(stock).not_to be_valid
    end
  end

  describe 'operation_type' do
    it '初期在庫として登録できること' do
      stock = build(:stock, operation_type: :initial)
      expect(stock).to be_valid
    end

    it '入庫として登録できること' do
      stock = build(:stock, operation_type: :addition)
      expect(stock).to be_valid
    end

    it '出庫として登録できること' do
      stock = build(:stock, operation_type: :subtraction)
      expect(stock).to be_valid
    end
  end

  describe 'コールバック' do
    it 'operated_atが未設定の場合、保存時に現在時刻が設定されること' do
      stock = build(:stock, operated_at: nil)
      expect { stock.save }.to change { stock.operated_at }.from(nil)
    end
  end
end
