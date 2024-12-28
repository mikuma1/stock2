require 'rails_helper'

RSpec.describe 'Api::V1::Categories', type: :request do
  let(:company) { create(:company) }
  let(:admin) { create(:user, :admin, company: company, role: 'admin') }
  let(:user) { create(:user, company: company) }
  let(:category) { create(:category, company: company) }

  def valid_params
    { category: { name: '新しいカテゴリー', description: 'カテゴリーの説明' } }
  end

  def invalid_params
    { category: { name: '', description: '' } }
  end

  describe 'GET /api/v1/companies/:company_id/categories' do
    context '認証済みユーザーの場合' do
      before do
        sign_in user
        create_list(:category, 3, company: company)
        get api_v1_company_categories_path(company)
      end

      it '200を返すこと' do
        expect(response).to have_http_status(:ok)
      end

      it '全てのカテゴリーを返すこと' do
        expect(json.size).to eq(3)
      end
    end
  end

  describe 'GET /api/v1/companies/:company_id/categories/:id' do
    context '認証済みユーザーの場合' do
      before do
        sign_in user
        get api_v1_company_category_path(company, category)
      end

      it '200を返すこと' do
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'POST /api/v1/companies/:company_id/categories' do
    context '管理者の場合' do
      before { sign_in admin }

      it '有効なパラメータで作成できること' do
        expect do
          post api_v1_company_categories_path(company), params: valid_params
        end.to change(Category, :count).by(1)
        expect(response).to have_http_status(:created)
      end

      it '無効なパラメータで作成できないこと' do
        expect do
          post api_v1_company_categories_path(company), params: invalid_params
        end.not_to change(Category, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context '一般ユーザーの場合' do
      before { sign_in user }

      it '作成できないこと' do
        post api_v1_company_categories_path(company), params: valid_params
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'PATCH /api/v1/companies/:company_id/categories/:id' do
    context '管理者の場合' do
      before { sign_in admin }

      it '更新できること' do
        patch api_v1_company_category_path(company, category), params: valid_params
        expect(response).to have_http_status(:ok)
      end
    end

    context '一般ユーザーの場合' do
      before { sign_in user }

      it '更新できないこと' do
        patch api_v1_company_category_path(company, category), params: valid_params
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'DELETE /api/v1/companies/:company_id/categories/:id' do
    context '管理者の場合' do
      before { sign_in admin }

      it '削除できること' do
        delete api_v1_company_category_path(company, category)
        expect(response).to have_http_status(:no_content)
      end
    end

    context '一般ユーザーの場合' do
      before { sign_in user }

      it '削除できないこと' do
        delete api_v1_company_category_path(company, category)
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  private

  def json
    @json ||= response.parsed_body
  end
end
