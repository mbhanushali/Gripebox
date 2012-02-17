Gripebox::Application.routes.draw do

  mount Ckeditor::Engine => '/ckeditor'

  resources :pages

  match '/flag-gripe' => 'flag_gripes#update'

  match '/embed_details' => 'embed_details#create'

  match '/error/404' => 'error_pages#index'

  match '/facebook/access_token' => 'account#facebook'

  match 'filter_gripe_view' => 'home#filter_gripe_view'
  
  match 'show-more' => 'show_more#index'
  match 'show-more-view-all' => 'show_more#view_all'

  match 'check-gripes' => 'show_more#check_gripes'

  match 'gripe_view' => 'home#gripe_view'

  match 'check_read' => 'notifications#check_read'

  match 'check_user_reg_param' => 'home#check_user_reg_param'

  match 'check_user_login_param' => 'home#check_user_login_param'
  
  match '/account/tw' => 'account#tw'

  match '/account/fb' => 'account#fb'

  match 'account/avatar/upload' => 'account#avatar_upload'

  match 'account/avatar' => 'account#avatar'

  match 'count_tags' => 'home#count_tags'

  match 'check_embed_image' => 'uploader#check_embed_image'

  match 'account/remove' => 'account#remove'

  match 'account/email_me' => 'account#email_me'

  match 'uploader' => 'uploader#index'

  match 'gripe/power' => 'gripes#power'
  
  match 'file_uploads' => 'uploader#index'

  match 'uploader/image' => 'uploader#image'

  match 'search' => 'search#index'

  match 'subscriptions' => 'subscriptions#index'

  match 'notifications' => 'notifications#index'

  match '/gripe/rate' => 'gripes#rate'

  match '/gripe/image/update' => 'gripes#image_update'

  match '/gripe/video/update' => 'gripes#video_update'  

  match '/gripe/embed/save' => 'gripes#embed_save'

  match '/gripe/update/text' => 'gripes#text_update'  

  match '/gripe/filter' => 'gripes#filter'  

  match '/gripe/comment' => 'gripes#comment'

  match '/gripe/subscription' => 'gripes#subscription'  

  match '/mygripes' => 'gripes#mygripes'  

  resources :gripes

  mount RailsAdmin::Engine => '/admin', :as => 'rails_admin'

  match 'account' => 'account#index'

  match 'account/password' => 'account#password'

  match '/account/setting/save' => 'account#setting_save'
  
  match '/auth/:provider/callback' => 'authentications#create'

  resources :authentications

  devise_for :users, :controllers => { :registrations => 'registrations' }

  root :to => 'home#index'

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
