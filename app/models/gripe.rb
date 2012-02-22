class Gripe < ActiveRecord::Base
  after_destroy :delete_tags
  after_save :count_buzz
  
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
  has_many :activities, :dependent => :destroy

  define_index do
    # fields
    indexes title, :sortable => true
    indexes overview
    indexes gripe_text(:content), :sortable => true
    indexes taggings.tag.name, :as => :tags
    indexes user(:username), :as => :author, :sortable => true
    
    # attributes
    has created_at, updated_at
    set_property :delta =>  :delayed
  end
  private  
  def delete_tags
    tags = []
    tag_names = []
  	all_tags = self.class.find_by_sql("select * from tags WHERE id not in(select distinct(tag_id) as tag_id from taggings)")
  	all_tags.each do |tag|
  		tags << tag.id.to_s
  		tag_names << '"' + tag.name.to_s + '"'
  	end
  	self.connection.execute("delete from tags where id in("+tags.join(',').gsub('"', '\"')+")")
  	self.connection.execute("delete from buzzs where tag in("+tag_names.join(',').gsub('"', '\"')+")")
  	count_buzz
  end
  
  def count_buzz
    self.class.where('created_at > ?',1.week.ago).tag_counts_on(:tags).each do |tag|
      buzz = Buzz.where('tag = ? AND period = ?',tag.name, 'week').last
      if buzz.present?
        buzz.count = tag.count
        buzz.period = "week"
        buzz.save        
      else  
        buzz = Buzz.new
        buzz.tag = tag.name
        buzz.count = tag.count
        buzz.period = "week"
        buzz.save
      end  
    end

    self.class.where('created_at > ?',1.month.ago).tag_counts_on(:tags).each do |tag|
      buzz = Buzz.where('tag = ? AND period = ?',tag.name, 'month').last
      if buzz.present?
        buzz.count = tag.count
        buzz.period = "month"
        buzz.save        
      else  
        buzz = Buzz.new
        buzz.tag = tag.name
        buzz.count = tag.count
        buzz.period = "month"
        buzz.save
      end  
    end
    
    self.class.where('created_at > ?',1.year.ago).tag_counts_on(:tags).each do |tag|
      buzz = Buzz.where('tag = ? AND period = ?',tag.name, 'year').last
      if buzz.present?
        buzz.count = tag.count
        buzz.period = "year"
        buzz.save        
      else  
        buzz = Buzz.new
        buzz.tag = tag.name
        buzz.count = tag.count
        buzz.period = "year"
        buzz.save
      end  
    end  
  end

end
