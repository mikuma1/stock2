require 'rails_helper'

RSpec.describe Item, type: :model do
  let(:company) { create(:company) }
  let(:category) { create(:category, company: company) }

  describe 'バリデーション' do
    subject { build(:item) }

    it { is_expected.to belong_to(:category) }
    it { is_expected.to belong_to(:company) }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_length_of(:name).is_at_most(100) }
    it { is_expected.to validate_length_of(:unit).is_at_most(20) }
    it { is_expected.to validate_length_of(:purchase_notes).is_at_most(1000) }

    context '数値バリデーション' do
      it { is_expected.to validate_numericality_of(:minimum_quantity).is_greater_than_or_equal_to(0).allow_nil }
    end

    context 'URLバリデーション' do
      it '有効なURLを許可すること' do
        item = build(:item, url: 'https://example.com')
        expect(item).to be_valid
      end

      it '無効なURLを許可しないこと' do
        item = build(:item, url: 'invalid-url')
        expect(item).not_to be_valid
        expect(item.errors[:url]).to be_present
      end

      it '空のURLを許可すること' do
        item = build(:item, url: '')
        expect(item).to be_valid
      end
    end

    context '企業内での名前の一意性' do
      before { create(:item, name: '消耗品A', company: company) }

      it '同じ企業内で同じ名前を許可しないこと' do
        item = build(:item, name: '消耗品A', company: company)
        expect(item).not_to be_valid
        expect(item.errors[:name]).to include('は既に使用されています')
      end

      it '異なる企業では同じ名前を許可すること' do
        other_company = create(:company)
        item = build(:item, name: '消耗品A', company: other_company)
        expect(item).to be_valid
      end
    end

    describe 'stock_quantity' do
      let(:item) { build(:item, stock_quantity: nil, category: category, company: company) }

      it '空の場合は無効であること' do
        expect(item).to be_invalid
        expect(item.errors[:stock_quantity]).to include('を入力してください')
      end

      it '数値以外は無効であること' do
        item.stock_quantity = 'abc'
        expect(item).to be_invalid
        expect(item.errors[:stock_quantity]).to include('は数値で入力してください')
      end

      it '負の数は無効であること' do
        item.stock_quantity = -1
        expect(item).to be_invalid
        expect(item.errors[:stock_quantity]).to include('は0以上の値にしてください')
      end

      it '小数は無効であること' do
        item.stock_quantity = 1.5
        expect(item).to be_invalid
        expect(item.errors[:stock_quantity]).to include('は整数で入力してください')
      end

      it '0以上の整数は有効であること' do
        item.stock_quantity = 0
        expect(item).to be_valid
      end
    end
  end

  describe 'スコープ' do
    describe '.sorted' do
      it '名前順に並べ替えること' do
        create(:item, name: 'C品', company: company)
        create(:item, name: 'A品', company: company)
        create(:item, name: 'B品', company: company)

        expect(described_class.sorted.pluck(:name)).to eq(%w[A品 B品 C品])
      end
    end
  end

  describe '在庫関連' do
    let(:item) { create(:item) }

    describe '#stock_history' do
      it '在庫履歴を新しい順に返すこと' do
        old_stock = create(:stock, item: item, operated_at: 1.day.ago)
        new_stock = create(:stock, item: item, operated_at: Time.current)

        history = item.stock_history
        expect(history.first).to eq(new_stock)
        expect(history.second).to eq(old_stock)
      end
    end

    describe 'stocks関連' do
      it '消耗品を削除すると、関連する在庫履歴も削除されること' do
        create_list(:stock, 3, item: item)
        expect { item.destroy }.to change(Stock, :count).by(-3)
      end
    end
  end

  describe '#update_stock_quantity!' do
    let(:user) { create(:user) }
    let(:item) { create(:item, stock_quantity: 10) }

    before do
      allow(Current).to receive(:user).and_return(user)
    end

    context '在庫増加の場合' do
      it '在庫履歴が作成されること' do
        expect do
          item.update_stock_quantity!(quantity: 5, operation_type: 'addition')
        end.to change(Stock, :count).by(1)
      end

      it '在庫履歴の内容が正しいこと' do
        item.update_stock_quantity!(quantity: 5, operation_type: 'addition')
        stock = Stock.last

        aggregate_failures do
          expect(stock.quantity).to eq(5)
          expect(stock.operated_at).to be_present
          expect(stock.company).to eq(item.company)
          expect(stock.user).to eq(user)
        end
      end
    end

    context '在庫減少の場合' do
      it '在庫履歴が作成されること' do
        expect do
          item.update_stock_quantity!(quantity: 5, operation_type: 'subtraction')
        end.to change(Stock, :count).by(1)

        stock = Stock.last
        expect(stock.quantity).to eq(-5)
        expect(stock.operated_at).to be_present
      end
    end

    it 'トランザクションがロールバックされること' do
      allow(item).to receive(:update!).and_raise(ActiveRecord::RecordInvalid)

      expect do
        item.update_stock_quantity!(quantity: 5, operation_type: 'addition')
      end.to raise_error(ActiveRecord::RecordInvalid)

      expect(item.reload.stock_quantity).to eq 10
    end
  end
end
