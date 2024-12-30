require 'rails_helper'

RSpec.describe 'Api::V1::Items', type: :request do
  let(:company) { create(:company) }
  let(:category) { create(:category, company: company) }
  let(:admin) { create(:user, :admin, company: company) }
  let(:user) { create(:user, company: company) }

  def item
    @item ||= create(:item, company: company, category: category)
  end

  def valid_params
    {
      item: {
        name: '新しい消耗品',
        description: '消耗品の説明',
        minimum_quantity: 10,
        unit: '個',
        url: 'https://example.com',
        purchase_notes: '購入時の注意事項',
        category_id: category.id
      }
    }
  end

  def invalid_params
    { item: { name: '', category_id: nil } }
  end

  describe 'GET /api/v1/companies/:company_id/items' do
    context '認証済みユーザーの場合' do
      before do
        sign_in user
        create_list(:item, 3, company: company, category: category)
      end

      it '消耗品一覧を取得できること' do
        get api_v1_company_items_path(company)
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body['data'].size).to eq(3)
      end

      it 'カテゴリでフィルタリングできること' do
        other_category = create(:category, company: company)
        create(:item, company: company, category: other_category)

        get api_v1_company_items_path(company, category_id: category.id)
        expect(response.parsed_body['data'].size).to eq(3)
      end
    end
  end

  describe 'GET /api/v1/companies/:company_id/items/:id' do
    context '認証済みユーザーの場合' do
      before { sign_in user }

      it '指定した消耗品の情報を取得できること' do
        get api_v1_company_item_path(company, item)
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body['data']['name']).to eq(item.name)
      end
    end
  end

  describe 'POST /api/v1/companies/:company_id/items' do
    context '認証済み管理者の場合' do
      before { sign_in admin }

      it '有効なパラメータで作成できること' do
        expect do
          post api_v1_company_items_path(company), params: valid_params
        end.to change(Item, :count).by(1)
        expect(response).to have_http_status(:created)
      end

      it '無効なパラメータで作成できないこと' do
        expect do
          post api_v1_company_items_path(company), params: invalid_params
        end.not_to change(Item, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context '認証済み一般ユーザーの場合' do
      before { sign_in user }

      it '作成できないこと' do
        post api_v1_company_items_path(company), params: valid_params
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'PATCH /api/v1/companies/:company_id/items/:id' do
    context '認証済み管理者の場合' do
      before { sign_in admin }

      it '更新できること' do
        patch api_v1_company_item_path(company, item), params: valid_params
        expect(response).to have_http_status(:ok)
        expect(item.reload.name).to eq('新しい消耗品')
      end

      it '無効なパラメータで更新できないこと' do
        patch api_v1_company_item_path(company, item), params: invalid_params
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context '認証済み一般ユーザーの場合' do
      before { sign_in user }

      it '更新できないこと' do
        patch api_v1_company_item_path(company, item), params: valid_params
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'DELETE /api/v1/companies/:company_id/items/:id' do
    context '認証済み管理者の場合' do
      before { sign_in admin }

      it '削除できること' do
        delete api_v1_company_item_path(company, item)
        expect(response).to have_http_status(:no_content)
      end
    end

    context '認証済み一般ユーザーの場合' do
      before { sign_in user }

      it '削除できないこと' do
        delete api_v1_company_item_path(company, item)
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'PATCH /api/v1/companies/:company_id/items/:id/update_stock' do
    let(:stock_params) do
      {
        stock: {
          quantity: 5,
          operation_type: 'addition'
        }
      }
    end

    context '認証済みユーザーの場合' do
      before { sign_in user }

      it '在庫を増やせること' do
        patch update_stock_api_v1_company_item_path(company, item), params: stock_params
        expect(response).to have_http_status(:ok)
        expect(item.reload.stock_quantity).to eq(5)
      end

      it '在庫を減らせること' do
        item.update!(stock_quantity: 10)
        patch update_stock_api_v1_company_item_path(company, item),
              params: { stock: { quantity: 3, operation_type: 'subtraction' } }
        expect(response).to have_http_status(:ok)
        expect(item.reload.stock_quantity).to eq(7)
      end

      it '在庫が不足している場合はエラーになること' do
        patch update_stock_api_v1_company_item_path(company, item),
              params: { stock: { quantity: 1, operation_type: 'subtraction' } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
