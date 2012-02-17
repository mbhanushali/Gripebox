class ShowMoreController < ApplicationController
  before_filter :create_gripes
  def index
    unless @gripes.empty?
      render :partial => "gripe", :collection => @gripes
    else
      render :text => "no gripes"
    end
  end
  
  def check_gripes
    if (@gripes.length + ((@page.to_i - 1)*@per_page.to_i)) < @gripes.count
      render :text => ''
    else
      render :text => 'hide'
    end
  end

  private
    def create_gripes
      @page = params[:page]
      @per_page = params[:per_page]
      @gripes = Gripe.where('created_at > ?',1.month.ago).order(:power).order("comments_count DESC").order("created_at DESC").paginate(:page => @page, :per_page => @per_page)      
    end
end
