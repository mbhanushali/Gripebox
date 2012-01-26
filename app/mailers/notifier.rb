class Notifier < ActionMailer::Base
  default :from => 'mailer@gripebox.com',
          :return_path => 'mailer@gripebox.com'

  def send_activity_top(user)
    @user = user
    @buzz = Buzz.where(:period => "week").where(:published => true).order("count DESC").limit(3)
    mail(:to => user.email, :subject => "Top 3 week gripes")
  end

  def send_activity_my(user)
    @user = user
    @msg = Msg.where('user_id = ? AND unread = ? AND gb = ?',user,false,"My Gripes").order('created_at DESC')
    if @msg.present?
      mail(:to => user.email, :subject => "My gripes activity")
    end  
  end

  def send_activity_sub(user)
    @user = user
    @msg = Msg.where('user_id = ? AND unread = ? AND gb = ?',user,false,"Subscriptions").order('created_at DESC')
    if @msg.present?
      mail(:to => user.email, :subject => "Subscriptions activity")
    end
  end

end
