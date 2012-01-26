class Rate < ActiveRecord::Base
  belongs_to :gripe
  belongs_to :user

  after_save :set_power_to_gripe

  def set_power_to_gripe
    gripe = Gripe.find(self.gripe_id)
    gripe.power = gripe.rate.where('value = ?',0).count - gripe.rate.where('value = ?',1).count
    gripe.save
  end
end
