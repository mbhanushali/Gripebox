class ShowMoreController < ApplicationController
  before_filter :create_gripes
  def index
    @gripes = Gripe.where('created_at > ?',1.month.ago).order(:power).order("comments_count DESC").order("created_at DESC").paginate(:page => @page, :per_page => @per_page)
    unless @gripes.empty?
      render :partial => "gripe", :collection => @gripes
    else
      render :text => "no gripes"
    end
  end
  
  def view_all
    @gripes = Gripe.order("created_at DESC").paginate(:page => @page, :per_page => @per_page)
    unless @gripes.empty?
      render :partial => "gripe", :collection => @gripes
    else
      render :text => "no gripes"
    end
  end
  
  def check_gripes
    @gripes = Gripe.where('created_at > ?',1.month.ago).order(:power).order("comments_count DESC").order("created_at DESC").paginate(:page => @page, :per_page => @per_page)
    if (@gripes.length + ((@page.to_i - 1)*@per_page.to_i)) < @gripes.count
    	respond_to do |format|
    		format.js { render :json => { :total_gripes => (@gripes.length + ((@page.to_i - 1)*@per_page.to_i)).to_i, :text => '' }}
    	end
    else
    	respond_to do |format|
      	format.js { render :json => { :total_gripes => (@gripes.length + ((@page.to_i - 1)*@per_page.to_i)).to_i, :text => 'hide' }}
      end
    end
  end
  
  def check_gripes_view_all
  	@gripes = Gripe.order("created_at DESC").paginate(:page => @page, :per_page => @per_page)
    if (@gripes.length + ((@page.to_i - 1)*@per_page.to_i)) < @gripes.count
    	respond_to do |format|
    		format.js { render :json => { :total_gripes => (@gripes.length + ((@page.to_i - 1)*@per_page.to_i)).to_i, :text => '' }}
    	end
    else
    	respond_to do |format|
      	format.js { render :json => { :total_gripes => (@gripes.length + ((@page.to_i - 1)*@per_page.to_i)).to_i, :text => 'hide' }}
      end
    end
  end

  private
    def create_gripes
      @page = params[:page]
      @per_page = params[:per_page]      
    end
end