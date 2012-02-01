class GripeObserver < ActiveRecord::Observer
  def after_save(gripe)
    if gripe.is_flag
      GripeMailer.flag_gripes(gripe).deliver
    end
  end
  
  def after_destroy(gripe)
    GripeMailer.gripe_owner_vialation_notificaiton(gripe).deliver if gripe.is_flag
  end
end
