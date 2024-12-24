require 'rails_helper'

RSpec.describe 'Api::V1::Users', type: :request do
  let(:company) { create(:company) }
  let(:admin) { create(:user, :admin, company: company) }
  let(:user) { create(:user, company: company) }
  
  describe 'GET /api/v1/companies/:company_id/users' do
    let!(:other_users) { create_list(:user, 3, company: company) }

    context '認証済みユーザーの場合' do
      before do
        sign_in user
      end

      it 'ユーザー一覧を取得できること' do
        get api_v1_company_users_path(company)
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body).size).to eq 5  # admin + user + other_users
      end
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
        expect(JSON.parse(response.body)['email']).to eq user.email
      end
    end
  end

  describe 'POST /api/v1/companies/:company_id/users' do
    let(:valid_params) do
      {
        user: {
          email: 'test@example.com',
          password: 'password123',
          role: 'user'
        }
      }
    end

    context '認証済み管理者の場合' do
      before do
        sign_in admin
      end

      context '有効なパラメータの場合' do
        it 'ユーザーを作成できること' do
          expect {
            post api_v1_company_users_path(company), params: valid_params
          }.to change(User, :count).by(1)
          
          expect(response).to have_http_status(:created)
          expect(JSON.parse(response.body)['email']).to eq 'test@example.com'
        end
      end

      context '無効なパラメータの場合' do
        it 'ユーザーを作成できないこと' do
          expect {
            post api_v1_company_users_path(company), params: { user: { email: nil } }
          }.not_to change(User, :count)
          
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context '認証済み一般ユーザーの場合' do
      before do
        sign_in user
      end

      it 'ユーザーを作成できないこと' do
        expect {
          post api_v1_company_users_path(company), params: valid_params
        }.not_to change(User, :count)
        
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'PATCH /api/v1/companies/:company_id/users/:id' do
    let(:target_user) { create(:user, company: company) }
    let(:valid_params) do
      {
        user: {
          email: 'updated@example.com'
        }
      }
    end

    context '認証済み管理者の場合' do
      before do
        sign_in admin
      end

      context '有効なパラメータの場合' do
        it 'ユーザー情報を更新できること' do
          patch api_v1_company_user_path(company, target_user), params: valid_params
          expect(response).to have_http_status(:ok)
          expect(target_user.reload.email).to eq 'updated@example.com'
        end
      end

      context '無効なパラメータの場合' do
        it 'ユーザー情報を更新できないこと' do
          patch api_v1_company_user_path(company, target_user), params: { user: { email: nil } }
          expect(response).to have_http_status(:unprocessable_entity)
          expect(target_user.reload.email).not_to be_nil
        end
      end
    end

    context '認証済み一般ユーザーの場合' do
      before do
        sign_in user
      end

      it 'ユーザー情報を更新できないこと' do
        patch api_v1_company_user_path(company, target_user), params: valid_params
        expect(response).to have_http_status(:forbidden)
        expect(target_user.reload.email).not_to eq 'updated@example.com'
      end
    end
  end
end
