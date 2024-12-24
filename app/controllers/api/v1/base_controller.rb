module Api
  module V1
    class BaseController < ApplicationController
      protect_from_forgery with: :null_session
      before_action :authenticate_user!

      private

      def render_success(data, status = :ok)
        render json: data, status: status
      end

      def render_error(message, status = :unprocessable_entity)
        render json: { errors: Array(message) }, status: status
      end

      def authorize_admin!
        return if current_user.admin?

        render_error('管理者権限が必要です', :forbidden)
      end
    end
  end
end
