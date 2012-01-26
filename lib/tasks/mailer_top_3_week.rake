desc "Send mailing top 3 gripes"
task :send_mailing_top_3_gripes => :environment do

  users = User.all
  users.each do |user|
    if user.email_me.present?

      if user.email_me.last.get_top_gripes_a_week
        Notifier.send_activity_top(user).deliver
      end

    end  
  end

end