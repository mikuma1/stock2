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
end
