require 'rails_helper'

RSpec.describe 'Api::V1::Departments', type: :request do
  let(:company) { create(:company) }
  let(:admin) { create(:user, :admin, company: company, role: 'admin') }
  let(:user) { create(:user, company: company) }
  let(:department) { create(:department, company: company) }

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

  private

  def json
    response.parsed_body
  end
end
