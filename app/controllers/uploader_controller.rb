class UploaderController < ApplicationController

  skip_before_filter :verify_authenticity_token
  
  def index
  	@file_upload = FileUpload.new(params[:file])

  	respond_to do |format|
      if @file_upload.save
        format.html { render json: @file_upload, status: :created }
        format.json { render json: @file_upload, status: :created }
      else
        format.html { render json: @file_upload.errors, status: :unprocessable_entity }
        format.json { render json: @file_upload.errors, status: :unprocessable_entity }
      end
    end
  end

  def image
    @image = FileUpload.find(params['id'])
  end

  def check_embed_image
    if params['embed'] != ''
      embed_res = system('curl -I ' + params["embed"] + ' | grep image')
      raise ActionController::RoutingError.new('Not Found') unless embed_res
    else
      raise ActionController::RoutingError.new('Not Found')
    end  
  end

end
