require 'rails_helper'

RSpec.describe 'Api::V1::Orders', type: :request do
  let(:company) { create(:company) }
  let(:admin) { create(:user, :admin, company: company) }
  let(:user) { create(:user, company: company) }
  let(:item) { create(:item, company: company) }
  let(:order) { create(:order, company: company, user: user, item: item) }

  before do
    host! 'localhost'
  end

  describe 'GET /api/v1/orders' do
    before do
      create_list(:order, 3, company: company, user: user, item: item)
    end

    context '認証済みユーザーの場合' do
      before do
        sign_in user
      end

      it '発注一覧を取得できること' do
        get api_v1_orders_path
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body.size).to eq 3
      end
    end
  end

  describe 'GET /api/v1/orders/:id' do
    context '認証済みユーザーの場合' do
      before do
        sign_in user
      end

      it '指定した発注の情報を取得できること' do
        get api_v1_order_path(order)
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body['id']).to eq order.id
      end
    end
  end

  describe 'POST /api/v1/orders' do
    def valid_params
      {
        order: {
          item_id: item.id,
          quantity: 10,
          note: 'テスト発注'
        }
      }
    end

    context '認証済みユーザーの場合' do
      before do
        sign_in user
      end

      it '発注を作成できること' do
        expect do
          post api_v1_orders_path, params: valid_params
        end.to change(Order, :count).by(1)
        expect(response).to have_http_status(:created)
      end

      context '無効なパラメータの場合' do
        it '発注を作成できないこと' do
          expect do
            post api_v1_orders_path, params: { order: { item_id: item.id } }
          end.not_to change(Order, :count)
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end
  end

  describe 'PATCH /api/v1/orders/:id/approve' do
    context '認証済み管理者の場合' do
      before do
        sign_in admin
      end

      it '発注を承認できること' do
        patch approve_api_v1_order_path(order)
        expect(response).to have_http_status(:ok)
        expect(order.reload.status).to eq 'approved'
        expect(order.approver).to eq admin
      end
    end

    context '認証済み一般ユーザーの場合' do
      before do
        sign_in user
      end

      it '発注を承認できないこと' do
        patch approve_api_v1_order_path(order)
        expect(response).to have_http_status(:forbidden)
        expect(order.reload.status).to eq 'pending'
      end
    end
  end

  describe 'PATCH /api/v1/orders/:id/reject' do
    context '認証済み管理者の場合' do
      before do
        sign_in admin
      end

      it '発注を却下できること' do
        patch reject_api_v1_order_path(order)
        expect(response).to have_http_status(:ok)
        expect(order.reload.status).to eq 'rejected'
        expect(order.approver).to eq admin
      end
    end

    context '認証済み一般ユーザーの場合' do
      before do
        sign_in user
      end

      it '発注を却下できないこと' do
        patch reject_api_v1_order_path(order)
        expect(response).to have_http_status(:forbidden)
        expect(order.reload.status).to eq 'pending'
      end
    end
  end

  describe 'PATCH /api/v1/orders/:id/order' do
    def approved_order
      @approved_order ||= create(:order, :approved, company: company, user: user, item: item)
    end

    context '認証済み管理者の場合' do
      before do
        sign_in admin
      end

      it '承認済みの発注を発注済みにできること' do
        patch order_api_v1_order_path(approved_order)
        expect(response).to have_http_status(:ok)
        expect(approved_order.reload.status).to eq 'ordered'
        expect(approved_order.ordered_at).to be_present
      end
    end
  end

  describe 'PATCH /api/v1/orders/:id/receive' do
    def ordered_order
      @ordered_order ||= create(:order, :ordered, company: company, user: user, item: item)
    end

    context '認証済み管理者の場合' do
      before do
        sign_in admin
      end

      it '発注済みの発注を受領済みにできること' do
        patch receive_api_v1_order_path(ordered_order)
        expect(response).to have_http_status(:ok)
        expect(ordered_order.reload.status).to eq 'received'
        expect(ordered_order.received_at).to be_present
      end
    end
  end
end
