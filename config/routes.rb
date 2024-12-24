Rails.application.routes.draw do
  devise_for :users
  
  namespace :api do
    namespace :v1 do
      resources :companies, only: [:index, :show, :create, :update] do
        resources :users, only: [:index, :show, :create, :update]
      end
    end
  end
end
