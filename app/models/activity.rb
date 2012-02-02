class Activity < ActiveRecord::Base
  belongs_to :gripe
  has_many :msg, :dependent => :destroy

  after_create :set_latest_activity_gripe

  def set_latest_activity_gripe
    gripe = Gripe.find(self.gripe_id)
    gripe.latest_activity = Time.now
    gripe.save
  end
end
