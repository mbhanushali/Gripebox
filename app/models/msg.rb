class Msg < ActiveRecord::Base
  belongs_to :activity
  belongs_to :user
  
  scope :unread_messages, where(:unread => false)
end
