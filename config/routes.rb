Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  devise_for :users

  get 'health', to: 'health_check#index'

  namespace :api do
    namespace :v1 do
      resources :companies, only: %i[index show create update] do
        resources :departments, only: %i[index show create update destroy]
        resources :users, only: %i[index show create update]
      end
      resources :companies do
        resources :categories, only: %i[index show create update destroy]
        resources :items, only: %i[index show create update destroy]
      end
      resources :items do
        resources :stocks, only: %i[index show create]
      end
      resources :orders do
        member do
          patch :approve
          patch :reject
          patch :order
          patch :receive
        end
      end
    end
  end
end
