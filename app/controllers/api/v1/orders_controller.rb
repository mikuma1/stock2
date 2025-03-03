module Api
  module V1
    class OrdersController < BaseController
      before_action :set_order, only: %i[show update approve reject order receive]
      before_action :authorize_admin!, only: %i[approve reject order receive]

      def index
        orders = current_company.orders
                                .includes(:item, :user, :approver)
                                .order(created_at: :desc)
        render_success(orders)
      end

      def show
        render_success(@order)
      end

      def create
        order = current_company.orders.build(order_params)
        order.user = current_user

        if order.save
          render_success(order, :created)
        else
          Rails.logger.error "Order creation failed: #{order.errors.full_messages.join(', ')}"
          render_error(order.errors.full_messages)
        end
      end

      def update
        if @order.update(order_params)
          render_success(@order)
        else
          Rails.logger.error "Order update failed: #{@order.errors.full_messages.join(', ')}"
          render_error(@order.errors.full_messages)
        end
      end

      def approve
        @order.approver = current_user
        if @order.update(status: :approved)
          render_success(@order)
        else
          Rails.logger.error "Order approval failed: #{@order.errors.full_messages.join(', ')}"
          render_error(@order.errors.full_messages)
        end
      end

      def reject
        @order.approver = current_user
        if @order.update(status: :rejected)
          render_success(@order)
        else
          Rails.logger.error "Order rejection failed: #{@order.errors.full_messages.join(', ')}"
          render_error(@order.errors.full_messages)
        end
      end

      def order
        @order.approver = current_user
        if @order.update(status: :ordered, ordered_at: Time.current)
          render_success(@order)
        else
          Rails.logger.error "Order ordering failed: #{@order.errors.full_messages.join(', ')}"
          render_error(@order.errors.full_messages)
        end
      end

      def receive
        @order.with_lock do
          @order.receive_stock!
          render_success(@order)
        rescue ActiveRecord::RecordInvalid => e
          Rails.logger.error "Order receiving failed: #{e.message}"
          render_error(e.record.errors.full_messages)
        rescue StandardError => e
          Rails.logger.error "Unexpected error in order receiving: #{e.message}"
          render_error([I18n.t('errors.messages.unexpected_error')])
        end
      end

      private

      def set_order
        @order = current_company.orders.find(params[:id])
      rescue ActiveRecord::RecordNotFound => e
        Rails.logger.error "Order not found: #{e.message}"
        raise
      end

      def order_params
        params.require(:order).permit(:item_id, :quantity, :note, :status)
      rescue ActionController::ParameterMissing => e
        Rails.logger.error "Invalid order parameters: #{e.message}"
        raise
      end
    end
  end
end
