class SubscriptionsController < ApplicationController

  before_filter :authenticate_user!
  	
  def index
		@gripes = Array.new

  	current_user.subscription.each do |sub|
  		@gripes << sub.gripe
  	end	
  end

end
