module Api
  module V1
    class DepartmentsController < BaseController
      before_action :set_company
      before_action :set_department, only: %i[update destroy]
      before_action :authorize_admin!

      def index
        @departments = @company.departments
        render json: @departments
      end

      def create
        @department = @company.departments.build(department_params)
        if @department.save
          render json: @department, status: :created
        else
          render json: { errors: @department.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @department.update(department_params)
          render json: @department
        else
          render json: { errors: @department.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        if @department.users.exists?
          render json: { errors: ['所属しているユーザーが存在するため削除できません'] }, status: :unprocessable_entity
        else
          @department.destroy
          head :no_content
        end
      end

      private

      def set_company
        @company = Company.find(params[:company_id])
      end

      def set_department
        @department = @company.departments.find(params[:id])
      end

      def department_params
        params.require(:department).permit(:name, :description)
      end

      def authorize_admin!
        return if current_user&.admin?

        render json: { error: '権限がありません' }, status: :forbidden
      end
    end
  end
end
