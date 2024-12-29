module Api
  module V1
    class StocksController < BaseController
      before_action :authorize_admin!, except: %i[index show]
      before_action :set_item
      before_action :set_stock, only: %i[show]

      def index
        @stocks = @item.stocks.order(operated_at: :desc)
        render json: @stocks
      end

      def show
        render json: @stock
      end

      def create
        @stock = @item.stocks.build(stock_params)
        @stock.company = current_company
        @stock.user = current_user

        if @stock.save
          render json: @stock, status: :created
        else
          render_error(@stock.errors.full_messages, :unprocessable_entity)
        end
      end

      private

      def set_item
        @item = current_company.items.find(params[:item_id])
      rescue ActiveRecord::RecordNotFound
        render_error('消耗品が見つかりません', :not_found)
      end

      def set_stock
        @stock = @item.stocks.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render_error('在庫履歴が見つかりません', :not_found)
      end

      def stock_params
        params.require(:stock).permit(:quantity, :operation_type, :note)
      end
    end
  end
end
