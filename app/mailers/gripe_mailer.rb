class GripeMailer < ActionMailer::Base
  default :from => 'mailer@gripebox.com',
          :return_path => 'mailer@gripebox.com'
  
  def flag_gripes(gripe)
    @gripe = gripe
    @user = User.first
    mail(:to => @user.email, :subject => "Flagged Gripe")
  end
  
  def gripe_owner_vialation_notificaiton(gripe)
    @gripe = gripe
    @user = gripe.user
    mail(:to => @user.email, :subject => "Gripe Violation and Deletion")
  end
end
