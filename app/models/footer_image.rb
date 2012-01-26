class FooterImage < ActiveRecord::Base
  has_attached_file :image, :styles => { :thumb => ["65x65#"] }
end
