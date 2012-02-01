class FlagGripesController < ApplicationController
  def update
    @gripe = Gripe.find_by_id(params[:id])
    @gripe.update_attributes(:is_flag => true)
    @gripe.show_flag = true
    render :partial => "inner_gripe", :locals => { :gripe => @gripe }
  end
end
