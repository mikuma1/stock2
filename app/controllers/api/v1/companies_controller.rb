module Api
  module V1
    class CompaniesController < BaseController
      def index
        companies = Company.all
        render_success(companies)
      end

      def show
        company = Company.find(params[:id])
        render_success(company)
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
        company = Company.find(params[:id])
        if company.update(company_params)
          render_success(company)
        else
          render_error(company.errors.full_messages)
        end
      end

      private

      def company_params
        params.require(:company).permit(:company_name, :address, :phone_number, :subdomain)
      end
    end
  end
end 