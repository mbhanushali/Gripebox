class NotificationsController < ApplicationController

  before_filter :authenticate_user! #:except => [:show, :index, :filter]

  def index
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


  def check_read
    msg = Msg.find(params['id'])
    msg.unread = true
    msg.save
  end

end
