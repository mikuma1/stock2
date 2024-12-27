require 'rails_helper'

RSpec.describe 'Api::V1::Departments', type: :request do
  let(:company) { create(:company) }
  let(:admin) { create(:user, :admin, company: company, role: 'admin') }
  let(:user) { create(:user, company: company) }
  let(:department) { create(:department, company: company) }

  def valid_params
    { department: { name: '新しい部署' } }
  end

  def invalid_params
    { department: { name: '' } }
  end

  describe 'GET /api/v1/companies/:company_id/departments' do
    context '管理者の場合' do
      before do
        host! 'localhost'
        sign_in admin
        create_list(:department, 3, company: company)
        get "/api/v1/companies/#{company.id}/departments"
      end

      it '200を返すこと' do
        expect(response).to have_http_status(:ok)
      end

      it '全ての部署を返すこと' do
        expect(json.size).to eq(3)
      end
    end

    context '一般ユーザーの場合' do
      before do
        host! 'localhost'
        sign_in user
        get "/api/v1/companies/#{company.id}/departments"
      end

      it '403を返すこと' do
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'POST /api/v1/companies/:company_id/departments' do
    context '管理者の場合' do
      before do
        host! 'localhost'
        sign_in admin
      end

      context '有効なパラメータの場合' do
        it '部署を作成できること' do
          expect do
            post "/api/v1/companies/#{company.id}/departments", params: valid_params
          end.to change(Department, :count).by(1)
          expect(response).to have_http_status(:created)
        end
      end

      context '無効なパラメータの場合' do
        it '部署を作成できないこと' do
          expect do
            post "/api/v1/companies/#{company.id}/departments", params: invalid_params
          end.not_to change(Department, :count)
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context '一般ユーザーの場合' do
      before do
        host! 'localhost'
        sign_in user
        post "/api/v1/companies/#{company.id}/departments", params: valid_params
      end

      it '403を返すこと' do
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'PATCH /api/v1/companies/:company_id/departments/:id' do
    context '管理者の場合' do
      before do
        host! 'localhost'
        sign_in admin
      end

      context '有効なパラメータの場合' do
        it '部署を更新できること' do
          patch "/api/v1/companies/#{company.id}/departments/#{department.id}",
                params: valid_params
          expect(response).to have_http_status(:ok)
          expect(department.reload.name).to eq('新しい部署')
        end
      end

      context '無効なパラメータの場合' do
        it '部署を更新できないこと' do
          patch "/api/v1/companies/#{company.id}/departments/#{department.id}",
                params: invalid_params
          expect(response).to have_http_status(:unprocessable_entity)
          expect(department.reload.name).not_to eq('')
        end
      end
    end

    context '一般ユーザーの場合' do
      before do
        host! 'localhost'
        sign_in user
        patch "/api/v1/companies/#{company.id}/departments/#{department.id}",
              params: valid_params
      end

      it '403を返すこと' do
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'DELETE /api/v1/companies/:company_id/departments/:id' do
    context '管理者の場合' do
      before do
        host! 'localhost'
        sign_in admin
      end

      it '部署を削除できること' do
        department # 事前に部署を作成
        expect do
          delete "/api/v1/companies/#{company.id}/departments/#{department.id}"
        end.to change(Department, :count).by(-1)
        expect(response).to have_http_status(:no_content)
      end
    end

    context '一般ユーザーの場合' do
      before do
        host! 'localhost'
        sign_in user
        delete "/api/v1/companies/#{company.id}/departments/#{department.id}"
      end

      it '403を返すこと' do
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  private

  def json
    response.parsed_body
  end
end
