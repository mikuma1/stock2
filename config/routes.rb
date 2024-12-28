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
    end
  end
end
