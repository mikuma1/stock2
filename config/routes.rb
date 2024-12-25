Rails.application.routes.draw do
  devise_for :users

  get 'health', to: 'health_check#index'

  namespace :api do
    namespace :v1 do
      resources :companies, only: [:index, :show, :create, :update] do
        resources :departments, only: [:index, :show, :create, :update, :destroy]
        resources :users, only: [:index, :show, :create, :update]
      end
    end
  end
end
