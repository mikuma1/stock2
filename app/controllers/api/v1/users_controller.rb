module Api
  module V1
    class UsersController < BaseController
      before_action :set_company
      before_action :set_user, only: %i[show update]
      before_action :authorize_admin!, only: %i[create update]

      def index
        users = @company.users.includes(:department)
        render_success(users)
      end

      def show
        render_success(@user)
      end

      def create
        user = @company.users.build(user_params)
        if user.save
          render_success(user, :created)
        else
          Rails.logger.error("User creation failed: #{user.errors.full_messages}")
          render_error(user.errors.full_messages)
        end
      end

      def update
        if @user.update(user_params)
          render_success(@user)
        else
          Rails.logger.error("User update failed: #{@user.errors.full_messages}")
          render_error(@user.errors.full_messages)
        end
      end

      private

      def set_company
        @company = Company.find(params[:company_id])
      end

      def set_user
        @user = @company.users.find(params[:id])
      end

      def user_params
        params.require(:user).permit(:email, :password, :role, :department_id)
      end
    end
  end
end
