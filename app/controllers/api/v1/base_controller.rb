module Api
  module V1
    class BaseController < ActionController::API
      include Devise::Controllers::Helpers

      before_action :authenticate_user!

      private

      def render_success(data, status = :ok)
        render json: { data: data }, status: status
      end

      def render_error(message, status = :unprocessable_entity)
        render json: { error: message }, status: status
      end

      def authorize_admin!
        return if current_user&.admin?

        render_error(I18n.t('errors.messages.admin_required'), :forbidden)
      end

      def current_company
        current_user&.company
      end

      def log_error(resource:, action:, message:)
        Rails.logger.error "#{resource.to_s.capitalize} #{action} failed: #{Array(message).join(', ')}"
      end
    end
  end
end
