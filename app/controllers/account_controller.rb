class AccountController < ApplicationController

  before_filter :authenticate_user! #:except => [:show, :index, :filter]

  def index
    if current_user.authentication.facebook.present?
      @graph = Koala::Facebook::API.new(current_user.authentication.facebook.token)
    end
    if current_user.authentication.twitter.present?
      client = Twitter::Client.new(:oauth_token => current_user.authentication.twitter.token, :oauth_token_secret => current_user.authentication.twitter.secret) 
      unless current_user.authentication.twitter.name.present?
        auth = Authentication.find(current_user.authentication.twitter.id)
        auth.name = Twitter.user(current_user.authentication.twitter.uid.to_i).name
        auth.save
      end
    end
  end

  def fb
    auth = Authentication.where(:user_id => current_user.id, :provider => "facebook").last
    if params[:evn] == "amp_up"
      auth.amp_up = !auth.amp_up
    end  

    if params[:evn] == "create_a_gripe"
      auth.create_a_gripe = !auth.create_a_gripe
    end
    auth.save
    render :text => "success"
  end

  def tw
    auth = Authentication.where(:user_id => current_user.id, :provider => "twitter").last
    if params[:evn] == "amp_up"
      auth.amp_up = !auth.amp_up
    end  

    if params[:evn] == "create_a_gripe"
      auth.create_a_gripe = !auth.create_a_gripe
    end
    auth.save
    render :text => "success"
  end

  def facebook
    if params['access_token']
      @facebook = FacebookActivity.new
      @facebook.user_id = current_user.id
      @facebook.access_token = params['access_token']
      render :text => "success" if @facebook.save

    end  
  end

  def avatar_upload

    @user = User.find(params['id'])

    if @user.update_attributes(params[:user])
      render json: @user, status: :created
    else
      raise ActionController::RoutingError.new('Not Found')
    end

  end

  def avatar
    
  end

  def remove
    @user = User.find(current_user.id)
    @user.destroy

    render :text => "success"
  end

  def password
    user = User.find(current_user.id)
    if user.valid_password?(params['current_password'])
      user.encrypted_password = BCrypt::Password.create(params['new_password'])
      user.save
    else
      render(:partial => 'errors/not_found', :status => :not_found)  
    end  
  end

  def setting_save

    @user = User.find(current_user.id)

    unless @user.email == params['email']
      @uniq_user = User.find_by_email(params['email'])
      render :text => "error: email exist" if @uniq_user.present?
    end

    unless @user.username == params['username']
      @uniq_user = User.find_by_username(params['username'])
      render :text => "error: username exist" if @uniq_user.present?
    end

    @user.email = params['email']
    @user.username = params['username']
    @user.occupation = params['occupation']
    @user.location = params['location']
    @user.birthday = params['birthday_d'] + params['birthday_m'] + params['birthday_y']
    @user.gender = params['gender']
    @user.save

  end

  def email_me

    emailme = EmailMe.where('user_id = ?', current_user.id).last

    unless emailme.present?
      emailme = EmailMe.new
      emailme.user_id = current_user.id
    end  

    if params['params'] == 'get_top_gripes_a_week'
      emailme.get_top_gripes_a_week = !emailme.get_top_gripes_a_week
    end    

    if params['params'] == 'update_comments'
      emailme.update_comments = !emailme.update_comments
    end    
    
    if params['params'] == 'update_subscriptions'
      emailme.update_subscriptions = !emailme.update_subscriptions
    end            

    emailme.save
      
  end

end
