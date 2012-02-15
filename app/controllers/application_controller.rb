class Error404 < StandardError; end
class PostNotFound < Error404; end
class ApplicationController < ActionController::Base
  protect_from_forgery

  layout :choose_layout
  before_filter :check_notification

  #http_basic_authenticate_with :name => "dev", :password => "dev"

  unless config.consider_all_requests_local
    rescue_from ActionController::RoutingError, :with => :render_404
    rescue_from ActiveRecord::RecordNotFound, :with => :render_404
    rescue_from Error404, :with => :render_404
    rescue_from PostNotFound, :with => :render_404
  end

  def call_rake(task, options = {})
    options[:rails_env] ||= Rails.env
    args = options.map { |n, v| "#{n.to_s.upcase}='#{v}'" }
    system "/home/ubuntu/.rvm/gems/ruby-1.9.3-p0/bin/rake #{task} #{args.join(' ')} --trace 2>&1 >> #{Rails.root}/log/rake.log &"
  end
  
  private
  	def check_notification
  	  if current_user
		    @msg = Msg.where('user_id = ?',current_user)
		    @my_gripes = Gripe.where('user_id = ?',current_user.id)
		    @subscriptions = Subscription.where('user_id = ?',current_user.id)
		
		    my_gripes_ids = Array.new
		
		    @my_gripes.each do |my_g|
		      my_gripes_ids << my_g.id
		    end    
		
		    msg_h_ids = Array.new
		
		    @msg.each do |msg|
		      msg_h_ids << msg.activity_id
		    end
		
		    my_sub_ids = Array.new
		
		    @subscriptions.each do |sub|
		      my_sub_ids << sub.gripe_id
		    end
		        
		    @activity = Activity.where{id.not_in msg_h_ids}.where{(gripe_id.in my_gripes_ids.concat(my_sub_ids))}
		
		    @activity.each do |activity|
		      msg = Msg.new
		      msg.activity_id = activity.id
		      msg.user_id = current_user.id
		      if my_gripes_ids.include?(activity.gripe_id)
		        if my_sub_ids.include?(activity.gripe_id)
		          msg.gb = "Subscriptions"
		        else  
		          msg.gb = "My Gripes"
		        end  
		      else  
		        msg.gb = "Subscriptions"
		      end  
		      msg.save
		    end
		
		    @msg = Msg.where('user_id = ?',current_user).order('created_at DESC')
  	  
  	  end
  	end
    def choose_layout
      (request.xhr?) ? nil : 'application'
    end  

    def render_404
      render :template => 'error_pages/index', :layout => false, :status => :not_found
    end

end
