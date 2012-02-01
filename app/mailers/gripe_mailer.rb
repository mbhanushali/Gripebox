class GripeMailer < ActionMailer::Base
  default :from => 'mailer@gripebox.com',
          :return_path => 'mailer@gripebox.com'
  
  def flag_gripes(gripe)
    @gripe = gripe
    @user = User.first
    mail(:to => @user.email, :subject => "Flagged Gripe")
  end
end
