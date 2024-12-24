class HealthCheckController < ApplicationController
  def index
    ActiveRecord::Base.connection.execute('SELECT 1')
    render json: { status: 'ok' }, status: :ok
  rescue StandardError => e
    render json: { status: 'error', message: e.message }, status: :service_unavailable
  end
end
