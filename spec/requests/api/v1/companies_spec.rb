require 'rails_helper'

RSpec.describe 'Api::V1::Companies', type: :request do
  let(:company) { create(:company) }
  let(:admin) { create(:user, :admin, company: company) }
  let(:user) { create(:user, company: company) }

  describe 'GET /api/v1/companies' do
    let!(:companies) { create_list(:company, 3) }

    context '認証済みユーザーの場合' do
      before do
        sign_in user
      end

      it '企業一覧を取得できること' do
        get api_v1_companies_path
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body.size).to eq 4
      end
    end
  end

  describe 'GET /api/v1/companies/:id' do
    context '認証済みユーザーの場合' do
      before do
        sign_in user
      end

      it '指定した企業の情報を取得できること' do
        get api_v1_company_path(company)
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body['company_name']).to eq company.company_name
      end
    end
  end

  describe 'POST /api/v1/companies' do
    let(:valid_params) do
      {
        company: {
          company_name: '株式会社テスト',
          phone_number: '03-1234-5678',
          subdomain: 'test-company'
        }
      }
    end

    context '認証済み管理者の場合' do # 管理者としてテスト
      before do
        sign_in admin
      end

      context '有効なパラメータの場合' do
        it '企業を作成できること' do
          expect do
            post api_v1_companies_path, params: valid_params
          end.to change(Company, :count).by(1)

          expect(response).to have_http_status(:created)
          expect(response.parsed_body['company_name']).to eq '株式会社テスト'
        end
      end

      context '無効なパラメータの場合' do
        it '企業を作成できないこと' do
          expect do
            post api_v1_companies_path, params: { company: { company_name: nil } }
          end.not_to change(Company, :count)

          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context '認証済み一般ユーザーの場合' do # 一般ユーザーとしてテスト
      before do
        sign_in user
      end

      it '企業を作成できないこと' do
        expect do
          post api_v1_companies_path, params: valid_params
        end.not_to change(Company, :count)

        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'PATCH /api/v1/companies/:id' do
    let(:valid_params) do
      {
        company: {
          company_name: '株式会社更新テスト'
        }
      }
    end

    context '認証済み管理者の場合' do # 管理者としてテスト
      before do
        sign_in admin
      end

      context '有効なパラメータの場合' do
        it '企業情報を更新できること' do
          patch api_v1_company_path(company), params: valid_params
          expect(response).to have_http_status(:ok)
          expect(company.reload.company_name).to eq '株式会社更新テスト'
        end
      end

      context '無効なパラメータの場合' do
        it '企業情報を更新できないこと' do
          patch api_v1_company_path(company), params: { company: { company_name: nil } }
          expect(response).to have_http_status(:unprocessable_entity)
          expect(company.reload.company_name).not_to be_nil
        end
      end
    end

    context '認証済み一般ユーザーの場合' do # 一般ユーザーとしてテスト
      before do
        sign_in user
      end

      it '企業情報を更新できないこと' do
        patch api_v1_company_path(company), params: valid_params
        expect(response).to have_http_status(:forbidden)
        expect(company.reload.company_name).not_to eq '株式会社更新テスト'
      end
    end
  end
end
