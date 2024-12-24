module Api
  module V1
    class CompaniesController < BaseController
      before_action :set_company, only: [:show, :update]
      before_action :authorize_admin!, only: [:create, :update]

      def index
        companies = Company.includes(:users)  # N+1対策
        render_success(companies)
      end

      def show
        render_success(@company)
      end

      def create
        company = Company.new(company_params)
        if company.save
          render_success(company, :created)
        else
          render_error(company.errors.full_messages)
        end
      end

      def update
        if @company.update(company_params)
          render_success(@company)
        else
          render_error(@company.errors.full_messages)
        end
      end

      private

      def set_company
        @company = Company.find(params[:id])
      end

      def company_params
        params.require(:company).permit(:company_name, :address, :phone_number, :subdomain)
      end
    end
  end
end 