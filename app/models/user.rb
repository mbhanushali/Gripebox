class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable, 
         :recoverable, :rememberable, :trackable, :validatable

  # Virtual attribute for authenticating by either username or email
  # This is in addition to a real persisted field like 'username'
  attr_accessor :login

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :username, :login, :confirmed_at, :confirmation_url, :avatar

  has_attached_file :avatar, :styles => { :thumb => ["65x65#"] }

  validates :email, :uniqueness => true
  validates :username, :uniqueness => true

  has_many :gripe, :dependent => :destroy
  has_many :subscription, :dependent => :destroy
  has_many :comment, :dependent => :destroy
  has_many :email_me, :dependent => :destroy
  has_many :msgs, :dependent => :destroy

  has_one :facebook_activity

  has_many :authentication

  before_create :set_default_birthday

  def set_default_birthday
    self.birthday = "1980-01-01"
  end
  
  def count_unread_messages
    msgs.unread_messages.count
  end

  # Social auth from OmniAuth
  has_many :authentications, :dependent => :destroy

  def apply_omniauth(omniauth)
    self.email = omniauth['user_info']['email'] if email.blank?

    self.username = omniauth['user_info']['name']

    if omniauth['provider'] == "twitter"
      authentications.build(
        :provider => omniauth['provider'], 
        :uid => omniauth['uid'], 
        :token => omniauth["credentials"]["token"], 
        :secret => omniauth["credentials"]["secret"]
      )
    else
      authentications.build(:provider => omniauth['provider'], :uid => omniauth['uid'])  
    end  

  end

  def password_required?
    (authentications.empty? || !password.blank?) && super
  end


  # for login attr

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    login = conditions.delete(:login)
    where(conditions).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
  end

end
