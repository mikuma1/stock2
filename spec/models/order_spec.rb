require 'rails_helper'

RSpec.describe Order, type: :model do
  describe 'アソシエーション' do
    it { is_expected.to belong_to(:item) }
    it { is_expected.to belong_to(:company) }
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:approver).optional }
  end

  describe 'バリデーション' do
    subject { build(:order) }

    it { is_expected.to validate_presence_of(:quantity) }
    it { is_expected.to validate_numericality_of(:quantity).is_greater_than(0) }
    it { is_expected.to validate_presence_of(:status) }
    it { is_expected.to validate_length_of(:note).is_at_most(500) }
  end

  describe 'ステータス遷移' do
    let(:order) { create(:order) }

    context 'pending（申請中）の場合' do
      it 'approved（承認済み）に変更できること' do
        expect(order.update(status: :approved)).to be true
      end

      it 'rejected（却下）に変更できること' do
        expect(order.update(status: :rejected)).to be true
      end

      it 'ordered（発注済み）に直接変更できないこと' do
        expect(order.update(status: :ordered)).to be false
      end
    end

    context 'approved（承認済み）の場合' do
      let(:order) { create(:order, :approved) }

      it 'ordered（発注済み）に変更できること' do
        expect(order.update(status: :ordered)).to be true
      end

      it 'rejected（却下）に変更できること' do
        expect(order.update(status: :rejected)).to be true
      end

      it 'received（受領済み）に直接変更できないこと' do
        expect(order.update(status: :received)).to be false
      end
    end

    context 'ordered（発注済み）の場合' do
      let(:order) { create(:order, :ordered) }

      it 'received（受領済み）に変更できること' do
        expect(order.update(status: :received)).to be true
      end

      it '他のステータスに変更できないこと' do
        expect(order.update(status: :pending)).to be false
        expect(order.update(status: :approved)).to be false
        expect(order.update(status: :rejected)).to be false
      end
    end

    context 'rejected（却下）の場合' do
      let(:order) { create(:order, :rejected) }

      it 'pending（申請中）に変更できること' do
        expect(order.update(status: :pending)).to be true
      end

      it '他のステータスに変更できないこと' do
        expect(order.update(status: :approved)).to be false
        expect(order.update(status: :ordered)).to be false
        expect(order.update(status: :received)).to be false
      end
    end

    context 'received（受領済み）の場合' do
      let(:order) { create(:order, :received) }

      it '申請中や承認済みに変更できないこと' do
        expect(order.update(status: :pending)).to be false
        expect(order.update(status: :approved)).to be false
      end

      it '却下や発注済みに変更できないこと' do
        expect(order.update(status: :rejected)).to be false
        expect(order.update(status: :ordered)).to be false
      end
    end
  end

  describe '#receive_stock!' do
    let(:company) { create(:company) }
    let(:admin) { create(:user, :admin, company: company) }
    let(:item) { create(:item, company: company) }
    let(:order) do
      create(
        :order, :ordered,
        company: company,
        item: item,
        quantity: 5,
        approver: admin
      )
    end

    context '正常系' do
      before do
        order.approver = admin
        order.save!
      end

      it '在庫履歴のユーザーと会社が正しいこと' do
        order.receive_stock!
        stock = Stock.last
        expect(stock.user).to eq admin
        expect(stock.company).to eq company
      end

      it '在庫履歴が作成されること' do
        expect { order.receive_stock! }.to change(Stock, :count).by(1)
      end

      it '在庫履歴の数量が正しいこと' do
        order.receive_stock!
        expect(Stock.last.quantity).to eq 5
      end

      it '在庫履歴の操作タイプが正しいこと' do
        order.receive_stock!
        expect(Stock.last.operation_type).to eq 'addition'
      end

      it '受領日時が記録されること' do
        order.receive_stock!
        expect(order.received_at).to be_present
      end
    end

    context '異常系' do
      it 'トランザクションが正しく機能すること' do
        allow(item.stocks).to receive(:create!).and_raise(ActiveRecord::RecordInvalid)
        expect(Stock.count).to eq 0

        expect do
          order.receive_stock!
        end.to raise_error(ActiveRecord::RecordInvalid)

        expect(Stock.count).to eq 0
      end

      it '在庫履歴の作成に失敗した場合、受領日時が更新されないこと' do
        allow(item.stocks).to receive(:create!).and_raise(ActiveRecord::RecordInvalid)
        before_received_at = order.received_at

        expect do
          order.receive_stock!
        end.to raise_error(ActiveRecord::RecordInvalid)

        expect(order.reload.received_at).to eq before_received_at
      end
    end
  end
end
