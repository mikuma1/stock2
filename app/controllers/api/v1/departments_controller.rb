module Api
  module V1
    class DepartmentsController < ApplicationController
      before_action :authenticate_user!
      before_action :ensure_admin
      before_action :set_department, only: [:show, :update, :destroy]

      def index
        @departments = current_company.departments.sorted
        render json: @departments
      end

      def show
        render json: @department
      end

      def create
        @department = current_company.departments.build(department_params)

        if @department.save
          render json: @department, status: :created
        else
          render json: { errors: @department.errors }, status: :unprocessable_entity
        end
      end

      def update
        if @department.update(department_params)
          render json: @department
        else
          render json: { errors: @department.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        if @department.destroy
          head :no_content
        else
          render json: { errors: @department.errors }, status: :unprocessable_entity
        end
      end

      private

      def department_params
        params.require(:department).permit(:name, :description)
      end

      def set_department
        @department = current_company.departments.find(params[:id])
      end

      def ensure_admin
        unless current_user.admin?
          render json: { error: '権限がありません' }, status: :forbidden
        end
      end
    end
  end
end
