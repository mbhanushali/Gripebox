class ApplicationController < ActionController::Base
  protect_from_forgery

  layout :choose_layout

  #http_basic_authenticate_with :name => "dev", :password => "dev"

  unless config.consider_all_requests_local
    rescue_from Exception, :with => :render_404 
  end

  def call_rake(task, options = {})
    options[:rails_env] ||= Rails.env
    args = options.map { |n, v| "#{n.to_s.upcase}='#{v}'" }
    system "/home/ubuntu/.rvm/gems/ruby-1.9.3-p0/bin/rake #{task} #{args.join(' ')} --trace 2>&1 >> #{Rails.root}/log/rake.log &"
  end
  
  private  
    def choose_layout
      (request.xhr?) ? nil : 'application'
    end  

    def render_404
      render :template => 'error_pages/index', :layout => false, :status => :not_found
    end

end
