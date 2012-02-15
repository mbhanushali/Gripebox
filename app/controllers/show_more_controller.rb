class ShowMoreController < ApplicationController
  def index
    @page = params[:page]
    @gripes = Gripe.where('created_at > ?',1.month.ago).order(:power).order("comments_count DESC").order("created_at DESC").paginate(:page => @page, :per_page => 10)
    if @gripes.count > 0
      render :partial => "gripe", :collection => @gripes
    else
      render :text => "no gripes"
    end
  end
end
