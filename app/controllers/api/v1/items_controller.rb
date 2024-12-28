module Api
  module V1
    class ItemsController < BaseController
      before_action :authorize_admin!, except: %i[index show]
      before_action :set_item, only: %i[show update destroy]

      def index
        @items = filtered_items
        render json: { data: @items.sorted.as_json(include: :category) }
      rescue StandardError => e
        log_error('index', e.message)
        render_error([I18n.t('errors.messages.unexpected_error')], :internal_server_error)
      end

      def show
        render json: { data: @item.as_json(include: :category) }
      end

      def create
        @item = current_company.items.build(item_params)
        if @item.save
          render json: { data: @item }, status: :created
        else
          log_error('creation', @item.errors.full_messages)
          render_error(@item.errors.full_messages, :unprocessable_entity)
        end
      end

      def update
        if @item.update(item_params)
          render json: { data: @item }
        else
          log_error('update', @item.errors.full_messages)
          render_error(@item.errors.full_messages, :unprocessable_entity)
        end
      end

      def destroy
        if @item.destroy
          head :no_content
        else
          log_error('deletion', @item.errors.full_messages)
          render_error(@item.errors.full_messages, :unprocessable_entity)
        end
      end

      private

      def set_item
        @item = current_company.items.find(params[:id])
      end

      def item_params
        params.require(:item).permit(
          :name,
          :description,
          :minimum_quantity,
          :current_stock,
          :unit,
          :url,
          :purchase_notes,
          :category_id
        )
      end

      def filtered_items
        items = current_company.items.includes(:category)
        items = items.where(category_id: params[:category_id]) if params[:category_id].present?
        items = items.low_stock if params[:low_stock].present?
        items
      end

      def log_error(action, error_messages)
        Rails.logger.error "Item #{action} failed: #{Array(error_messages).join(', ')}"
      end
    end
  end
end
