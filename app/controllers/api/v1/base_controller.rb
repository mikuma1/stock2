module Api
  module V1
    class BaseController < ApplicationController
      before_action :authenticate_user!

      private

      def current_user
        @current_user ||= User.find_by(id: doorkeeper_token&.resource_owner_id)
      end
    end
  end
end
