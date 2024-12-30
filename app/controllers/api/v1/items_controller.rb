module Api
  module V1
    class ItemsController < BaseController
      before_action :authorize_admin!, except: %i[index show update_stock]
      before_action :set_item, only: %i[show update destroy update_stock]

      def index
        @items = filtered_items
        render_success(@items.sorted.as_json(include: :category))
      rescue StandardError => e
        log_error(resource: :item, action: :index, message: e.message)
        render_error([I18n.t('errors.messages.unexpected_error')], :internal_server_error)
      end

      def show
        render_success(serialize_item(@item))
      end

      def create
        @item = current_company.items.build(item_params)
        if @item.save
          render_success(serialize_item(@item), :created)
        else
          log_error(resource: :item, action: :creation, message: @item.errors.full_messages)
          render_error(@item.errors.full_messages, :unprocessable_entity)
        end
      end

      def update
        if @item.update(item_params)
          render_success(serialize_item(@item))
        else
          log_error(resource: :item, action: :update, message: @item.errors.full_messages)
          render_error(@item.errors.full_messages, :unprocessable_entity)
        end
      end

      def destroy
        if @item.destroy
          head :no_content
        else
          log_error(resource: :item, action: :deletion, message: @item.errors.full_messages)
          render_error(@item.errors.full_messages, :unprocessable_entity)
        end
      end

      def update_stock
        @item.update_stock_quantity!(stock_params.to_h.symbolize_keys)
        render_success(serialize_item(@item))
      rescue ArgumentError, ActiveRecord::RecordInvalid => e
        handle_stock_update_error(e)
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
          :unit,
          :url,
          :purchase_notes,
          :category_id
        )
      end

      def filtered_items
        items = current_company.items.includes(:category)
        items = items.where(category_id: params[:category_id]) if params[:category_id].present?
        items
      end

      def log_error(action, error_messages)
        Rails.logger.error "Item #{action} failed: #{Array(error_messages).join(', ')}"
      end

      def stock_params
        params.require(:stock).permit(:quantity, :operation_type)
      end

      def handle_stock_update_error(error)
        case error
        when ArgumentError
          log_error(resource: :item, action: :stock_update, message: error.message)
          render_error([error.message], :unprocessable_entity)
        when ActiveRecord::RecordInvalid
          log_error(resource: :item, action: :stock_update, message: error.record.errors.full_messages)
          render_error(error.record.errors.full_messages, :unprocessable_entity)
        end
      end
    end
  end
end
