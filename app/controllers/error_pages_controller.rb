class ErrorPagesController < ApplicationController
	def index
	  render :layout => false, :status => :not_found
	end
end
