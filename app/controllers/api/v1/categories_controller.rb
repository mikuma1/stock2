module Api
  module V1
    class CategoriesController < BaseController
      before_action :authorize_admin!, except: %i[index show]
      before_action :set_category, only: %i[show update destroy]

      def index
        @categories = current_company.categories
        render json: @categories.as_json
      rescue StandardError => _e
        render_error(['予期せぬエラーが発生しました'], :internal_server_error)
      end

      def show
        render json: @category.as_json
      end

      def create
        @category = current_company.categories.build(category_params)
        if @category.save
          render json: @category, status: :created
        else
          Rails.logger.error "Category creation failed: #{@category.errors.full_messages.join(', ')}"
          render_error(@category.errors.full_messages, :unprocessable_entity)
        end
      end

      def update
        if @category.update(category_params)
          render json: @category
        else
          Rails.logger.error "Category update failed: #{@category.errors.full_messages.join(', ')}"
          render_error(@category.errors.full_messages, :unprocessable_entity)
        end
      end

      def destroy
        @category.destroy
        head :no_content
      rescue StandardError => e
        Rails.logger.error "Category deletion failed: #{e.message}"
        render_error(['カテゴリーの削除に失敗しました'], :unprocessable_entity)
      end

      private

      def category_params
        params.require(:category).permit(:name, :description)
      end

      def set_category
        @category = current_company.categories.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render_error('カテゴリが見つかりません', :not_found)
      end
    end
  end
end
