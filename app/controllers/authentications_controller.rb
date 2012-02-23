class AuthenticationsController < ApplicationController
  def index
    @authentications = current_user.authentications if current_user
    
    redirect_to authentications_url
  end

  def create
      
    omniauth = request.env["omniauth.auth"]

    authentication = Authentication.find_by_provider_and_uid(omniauth['provider'], omniauth['uid'])
    if authentication
      flash[:notice] = "Signed in successfully."
      sign_in_and_redirect(:user, authentication.user)
    elsif current_user
      current_user.authentications.create!(
        :provider => omniauth['provider'], 
        :uid => omniauth['uid'], 
        :name => omniauth['user_info']['name'],
        :token => omniauth["credentials"]["token"],
        :secret => omniauth["credentials"]["secret"],
        :create_a_gripe => 1,
        :amp_up => 1
      )
      
      flash[:notice] = "Authentication successful."
      redirect_to account_path
    else
      user = User.new
      user.apply_omniauth(omniauth)

      if user.save
        flash[:notice] = "Please check your email to activate your account first."
        redirect_to root_path
        #sign_in_and_redirect(:user, user)
      else

        flash[:notice] = "This email or username is already linked to a Gripebox account. Use Gripebox's sign in to connect Facebook or Twitter in your account settings"
          
        session[:omniauth] = omniauth.except('extra')
        redirect_to root_path
        #redirect_to new_user_registration_url
      end
    end
      
  end

  def destroy
    @authentication = current_user.authentications.find(params[:id])
    @authentication.destroy
    flash[:notice] = "Successfully destroyed authentication."
    redirect_to account_path
  end  
end
