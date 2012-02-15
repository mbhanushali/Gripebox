class HomeController < ApplicationController

  def index
    @news = News.order('created_at DESC').limit(5)
    @gripes = Gripe.where('created_at > ?',1.month.ago).order(:power).order("comments_count DESC").order("created_at DESC").paginate(:page => 1, :per_page => 10)
  end

  def count_tags

    Gripe.where('created_at > ?',1.week.ago).tag_counts_on(:tags).each do |tag|
      buzz = Buzz.where('tag = ? AND period = ?',tag.name, 'week').last
      if buzz.present?
        buzz.count = tag.count
        buzz.period = "week"
        buzz.save        
      else  
        buzz = Buzz.new
        buzz.tag = tag.name
        buzz.count = tag.count
        buzz.period = "week"
        buzz.save
      end  
    end

    Gripe.where('created_at > ?',1.month.ago).tag_counts_on(:tags).each do |tag|
      buzz = Buzz.where('tag = ? AND period = ?',tag.name, 'month').last
      if buzz.present?
        buzz.count = tag.count
        buzz.period = "month"
        buzz.save        
      else  
        buzz = Buzz.new
        buzz.tag = tag.name
        buzz.count = tag.count
        buzz.period = "month"
        buzz.save
      end  
    end
    
    Gripe.where('created_at > ?',1.year.ago).tag_counts_on(:tags).each do |tag|
      buzz = Buzz.where('tag = ? AND period = ?',tag.name, 'year').last
      if buzz.present?
        buzz.count = tag.count
        buzz.period = "year"
        buzz.save        
      else  
        buzz = Buzz.new
        buzz.tag = tag.name
        buzz.count = tag.count
        buzz.period = "year"
        buzz.save
      end  
    end        
    
    render :text => "success"
      
  end

  def check_user_login_param
    @user = User.where('username = ? OR email = ?',params['user_login'],params['user_login']).last

    raise ActionController::RoutingError.new('Not Found') unless @user.present?
    raise ActionController::RoutingError.new('Not Found') unless @user.valid_password?(params['user_password'])

  end

  def check_user_reg_param

    @user = User.where('email = ?',params['user_email']).last

    if @user.present?
      render :text => "email"
    else
      @user = User.where('username = ?',params['username']).last

      if @user.present?
        render :text => "username" 
      end        
    end
  end

  def gripe_view

    @view_count = GripeView.new
    @view_count.gripe_id = params['id']
    render :text => "success" if @view_count.save
    
  end

  def filter_gripe_view
    @gripes = Gripe
    if params[:sort] == "week"
      @gripes = @gripes.where('created_at > ?',1.week.ago).order(:power).order("comments_count DESC").order("created_at DESC")
    end  
    if params[:sort] == "day"
      @gripes = @gripes.where('created_at > ?',1.day.ago).order(:power).order("comments_count DESC").order("created_at DESC")
    end  
    if params[:sort] == "month"
      @gripes = @gripes.where('created_at > ?',1.month.ago).order(:power).order("comments_count DESC").order("created_at DESC")
    end
    @gripes = @gripes.order(:power)
  end

end
