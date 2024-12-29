require 'rails_helper'

RSpec.describe 'Api::V1::Stocks', type: :request do
  let(:company) { create(:company) }
  let(:admin) { create(:user, :admin, company: company) }
  let(:user) { create(:user, company: company) }
  let(:item) { create(:item, company: company) }
  let!(:stock) { create(:stock, item: item, company: company, user: admin) }

  describe 'GET /api/v1/items/:item_id/stocks' do
    context '認証済みユーザーの場合' do
      before do
        sign_in user
        create_list(:stock, 3, item: item, company: company, user: admin)
        get api_v1_item_stocks_path(item)
      end

      it '200を返すこと' do
        expect(response).to have_http_status(:ok)
      end

      it '全ての在庫履歴を返すこと' do
        expect(json.size).to eq(4)
      end
    end
  end

  describe 'GET /api/v1/items/:item_id/stocks/:id' do
    context '認証済みユーザーの場合' do
      before do
        sign_in user
        get api_v1_item_stock_path(item, stock)
      end

      it '200を返すこと' do
        expect(response).to have_http_status(:ok)
      end

      it '指定した在庫履歴を返すこと' do
        expect(json['id']).to eq(stock.id)
      end
    end
  end

  describe 'POST /api/v1/items/:item_id/stocks' do
    context '管理者の場合' do
      before { sign_in admin }

      it '在庫履歴を作成できること' do
        expect do
          post api_v1_item_stocks_path(item), params: valid_stock_params
        end.to change(Stock, :count).by(1)
        expect(response).to have_http_status(:created)
      end

      it '無効なパラメータでは作成できないこと' do
        expect do
          post api_v1_item_stocks_path(item), params: invalid_stock_params
        end.not_to change(Stock, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context '一般ユーザーの場合' do
      before { sign_in user }

      it '在庫履歴を作成できないこと' do
        expect do
          post api_v1_item_stocks_path(item), params: valid_stock_params
        end.not_to change(Stock, :count)
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  private

  def json
    @json ||= response.parsed_body
  end

  def valid_stock_params
    {
      stock: {
        quantity: 10,
        operation_type: 'addition',
        note: '入庫'
      }
    }
  end

  def invalid_stock_params
    {
      stock: {
        quantity: nil,
        operation_type: 'addition',
        note: '入庫'
      }
    }
  end
end
