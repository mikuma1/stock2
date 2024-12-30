require 'rails_helper'

RSpec.describe 'Api::V1::Users', type: :request do
  let(:company) { create(:company) }
  let(:department) { create(:department, company: company) }
  let(:admin) { create(:user, :admin, company: company) }
  let(:user) { create(:user, company: company, department: department) }
  let(:target_user) { create(:user, company: company) }

  def valid_params
    {
      user: {
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
        department_id: department.id
      }
    }
  end

  describe 'GET /api/v1/companies/:company_id/users' do
    before do
      create_list(:user, 3, company: company)
      sign_in user
    end

    it 'ユーザー一覧を取得できること' do
      get api_v1_company_users_path(company_id: company.id)
      expect(response).to have_http_status(:ok)
      expect(response.parsed_body['data'].size).to eq 4
    end
  end

  describe 'GET /api/v1/companies/:company_id/users/:id' do
    context '認証済みユーザーの場合' do
      before do
        sign_in user
      end

      it '指定したユーザーの情報を取得できること' do
        get api_v1_company_user_path(company, user)
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body['data']['email']).to eq user.email
      end
    end
  end

  describe 'POST /api/v1/companies/:company_id/users' do
    context '認証済み管理者の場合' do
      before do
        sign_in admin
      end

      context '有効なパラメータの場合' do
        it 'ユーザーを作成できること' do
          expect do
            post api_v1_company_users_path(company), params: valid_params
          end.to change(User, :count).by(1)

          expect(response).to have_http_status(:created)
          expect(response.parsed_body['data']['email']).to eq 'test@example.com'
        end
      end

      context '無効なパラメータの場合' do
        it 'ユーザーを作成できないこと' do
          expect do
            post api_v1_company_users_path(company), params: { user: { email: nil } }
          end.not_to change(User, :count)

          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context '認証済み一般ユーザーの場合' do
      before do
        sign_in user
      end

      it 'ユーザーを作成できないこと' do
        expect do
          post api_v1_company_users_path(company), params: valid_params
        end.not_to change(User, :count)

        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'PATCH /api/v1/companies/:company_id/users/:id' do
    context '認証済み管理者の場合' do
      before do
        sign_in admin
      end

      it 'ユーザー情報を更新できること' do
        patch api_v1_company_user_path(company, target_user),
              params: { user: { email: 'updated@example.com' } }
        expect(response).to have_http_status(:ok)
        expect(target_user.reload.email).to eq 'updated@example.com'
      end
    end

    context '認証済み一般ユーザーの場合' do
      before do
        sign_in user
      end

      it 'ユーザー情報を更新できないこと' do
        patch api_v1_company_user_path(company_id: company.id, id: user.id), params: { user: { email: 'new@example.com' } }
        expect(response).to have_http_status(:forbidden)
      end
    end
  end
end
