module Api
  module V1
    class DepartmentsController < BaseController
      before_action :authorize_admin!
      before_action :set_department, only: %i[update destroy]

      def index
        @departments = current_company.departments.includes(:users)
        render json: @departments
      end

      def create
        @department = current_company.departments.build(department_params)
        if @department.save
          render json: @department, status: :created
        else
          Rails.logger.error("Department creation failed: #{@department.errors.full_messages}")
          render json: { errors: @department.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @department.update(department_params)
          render json: @department
        else
          Rails.logger.error("Department update failed: #{@department.errors.full_messages}")
          render json: { errors: @department.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        if @department.users.exists?
          Rails.logger.error("Department deletion failed: #{@department.errors.full_messages}")
          render json: { errors: [I18n.t('departments.destroy.errors.users_exist')] }, status: :unprocessable_entity
        else
          @department.destroy
          head :no_content
        end
      end

      private

      def set_department
        @department = current_company.departments.find(params[:id])
      end

      def department_params
        params.require(:department).permit(:name, :description)
      end
    end
  end
end
