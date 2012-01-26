desc "Send mailing"
task :send_mailing => :environment do

  users = User.all
  users.each do |user|
    if user.email_me.present?

      if user.email_me.last.update_subscriptions
        Notifier.send_activity_sub(user).deliver
      end

      if user.email_me.last.update_comments
        Notifier.send_activity_my(user).deliver
      end

    end  
  end

end
