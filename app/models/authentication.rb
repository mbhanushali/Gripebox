class Authentication < ActiveRecord::Base
  attr_accessible :user, :provider, :uid, :name, :token, :secret, :create_a_gripe, :amp_up
  belongs_to :user

  def self.twitter
    where("provider = ?","twitter").last
  end

  def self.facebook
    where("provider = ?","facebook").last
  end  

end
