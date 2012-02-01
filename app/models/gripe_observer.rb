class GripeObserver < ActiveRecord::Observer
  def after_save(gripe)
    if gripe.is_flag
      GripeMailer.flag_gripes(gripe).deliver
    end
  end
end
