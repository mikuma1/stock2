module Api
  module V1
    class UsersController < BaseController
      before_action :set_company
      before_action :set_user, only: [:show, :update]
      before_action :authorize_admin!, only: [:create, :update]

      def index
        users = @company.users.includes(:company)
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
          render_error(user.errors.full_messages)
        end
      end

      def update
        if @user.update(user_params)
          render_success(@user)
        else
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
        params.require(:user).permit(:email, :password, :role)
      end

      def authorize_admin!
        unless current_user.admin?
          render_error('管理者権限が必要です', :forbidden)
        end
      end
    end
  end
end
