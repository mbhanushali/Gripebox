class News < ActiveRecord::Base

  has_attached_file :image, :styles => { :thumb => ["117x75#"], :normal => ["411x255#"] }
  has_attached_file :video

end
