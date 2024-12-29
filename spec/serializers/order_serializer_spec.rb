require 'rails_helper'

RSpec.describe OrderSerializer, type: :serializer do
  let(:company) { create(:company) }
  let(:user) { create(:user, company: company) }
  let(:admin) { create(:user, :admin, company: company) }
  let(:item) { create(:item, company: company) }
  let(:order) { create(:order, company: company, user: user, item: item, approver: admin) }

  def serializer
    @serializer ||= described_class.new(order)
  end

  def serialization
    @serialization ||= serializer.as_json
  end

  describe '基本属性' do
    it '正しい属性が含まれていること' do
      expect(serialization).to include(
        id: order.id,
        quantity: order.quantity,
        status: order.status,
        note: order.note,
        ordered_at: order.ordered_at&.as_json,
        received_at: order.received_at&.as_json,
        created_at: order.created_at&.as_json,
        updated_at: order.updated_at&.as_json
      )
    end
  end

  describe '関連' do
    it '関連するモデルの情報が含まれていること' do
      expect(serialization[:item]).to be_present
      expect(serialization[:user]).to be_present
      expect(serialization[:approver]).to be_present
    end

    context '承認者がいない場合' do
      let(:order) { create(:order, company: company, user: user, item: item, approver: nil) }

      it 'approverがnullであること' do
        expect(serialization[:approver]).to be_nil
      end
    end
  end

  describe '派生属性' do
    it '消耗品名が含まれていること' do
      expect(serialization[:item_name]).to eq order.item.name
    end

    it '申請者名が含まれていること' do
      expect(serialization[:user_name]).to eq order.user.name
    end

    it '承認者名が含まれていること' do
      expect(serialization[:approver_name]).to eq order.approver.name
    end

    it 'ステータスの日本語表示が含まれていること' do
      expect(serialization[:status_text]).to eq I18n.t("enums.order.status.#{order.status}")
    end

    context '承認者がいない場合' do
      let(:order) { create(:order, company: company, user: user, item: item, approver: nil) }

      it '承認者名がnullであること' do
        expect(serialization[:approver_name]).to be_nil
      end
    end
  end

  describe 'ステータスごとの表示' do
    def create_order_with_status(trait)
      order = create(:order, trait, company: company, user: user, item: item)
      [order, described_class.new(order).as_json]
    end

    it '申請中と承認済みのステータスが正しく日本語化されていること' do
      %i[pending approved].each do |status|
        _, serialization = create_order_with_status(status)
        expect(serialization[:status_text]).to eq I18n.t("enums.order.status.#{status}")
      end
    end

    it '却下と発注済みのステータスが正しく日本語化されていること' do
      %i[rejected ordered].each do |status|
        _, serialization = create_order_with_status(status)
        expect(serialization[:status_text]).to eq I18n.t("enums.order.status.#{status}")
      end
    end
  end
end
