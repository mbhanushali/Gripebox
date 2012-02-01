class Gripe < ActiveRecord::Base
  belongs_to :user

  attr_accessor :show_flag
  
  acts_as_taggable
	acts_as_commentable

  #validates :title, :uniqueness => true

  validates :title, :presence => true
  validates :overview, :presence => true
  validates :tag_list, :presence => true

  has_many :rate, :dependent => :destroy
	has_many :subscription, :dependent => :destroy
	has_many :gripe_view, :dependent => :destroy
  has_many :gripe_text, :dependent => :destroy

  has_many :file_gripe, :dependent => :destroy

  define_index do
    # fields
    indexes title, :sortable => true
    indexes overview
    indexes gripe_text(:content), :sortable => true
    indexes taggings.tag.name, :as => :tags
    indexes user(:username), :as => :author, :sortable => true
    
    # attributes
    has created_at, updated_at
  end

end
