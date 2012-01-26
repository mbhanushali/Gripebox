class GripeView < ActiveRecord::Base
  belongs_to :gripe, :counter_cache => :comments_count
end
