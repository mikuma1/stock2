require 'rails_helper'

RSpec.describe 'HealthCheck', type: :request do
  describe 'GET /health' do
    context 'システムが正常な場合' do
      it '200 OKを返すこと' do
        get '/health'
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body).to eq({ 'status' => 'ok' })
      end
    end

    context 'データベース接続に問題がある場合' do
      before do
        allow(ActiveRecord::Base.connection).to receive(:execute).and_raise(StandardError.new('DB connection error'))
      end

      it '503 Service Unavailableを返すこと' do
        get '/health'
        expect(response).to have_http_status(:service_unavailable)
        expect(response.parsed_body['status']).to eq('error')
      end
    end
  end
end
