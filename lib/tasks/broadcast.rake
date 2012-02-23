desc "Send broadcast to twitter and facebook"


task :send_twitter_amp => :environment do
  user = User.find(ENV["USER_ID"])
  if user.authentications.twitter.amp_up
    if user.authentication.twitter.present?
      client = Twitter::Client.new(:oauth_token => user.authentication.twitter.token, :oauth_token_secret => user.authentication.twitter.secret) 
      client.update("Just amped \"#{ENV['GRIPE_TITLE']}\" www.gripebox.com")
    end
  end  
end

task :send_twitter_new => :environment do
  user = User.find(ENV["USER_ID"])
  if user.authentications.twitter.create_a_gripe
    if user.authentication.twitter.present?
      client = Twitter::Client.new(:oauth_token => user.authentication.twitter.token, :oauth_token_secret => user.authentication.twitter.secret) 
      client.update("Just griped about \"#{ENV['GRIPE_TITLE']}\" www.gripebox.com \"#{ENV['GRIPE_TEXT']}\"")
    end
  end  
end      

task :send_facebook_amp => :environment do
  user = User.find(ENV["USER_ID"])
  if user.authentications.facebook.amp_up
    if user.authentication.facebook.present?
      @graph = Koala::Facebook::API.new(user.authentication.facebook.token)
      @graph.put_object("me", "feed", :message => "Just amped \"#{ENV['GRIPE_TITLE']}\" www.gripebox.com")
    end
  end  
end

task :send_facebook_new => :environment do
  user = User.find(ENV["USER_ID"])
  logger.warn("initiation #{user.id} warn")
  logger.info("initiation #{user.id} info")
  logger.debug("initiation #{user.id} debug")
  if user.authentications.facebook.create_a_gripe
  	logger.warn("creating a facebook")
    if user.authentication.facebook.present?
    logger.warn("facebook present")
      @graph = Koala::Facebook::API.new(user.authentication.facebook.token)
      logger.warn("graph")
      @graph.put_object("me", "feed", :message => "Just griped about \"#{ENV['GRIPE_TITLE']}\" www.gripebox.com \"#{ENV['GRIPE_TEXT']}\"")
      logger.warn("graph object")
    end
  end  
end  
