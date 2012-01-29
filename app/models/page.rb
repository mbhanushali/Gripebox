class Page < ActiveRecord::Base
  before_save :auto_position
  
  extend FriendlyId
  friendly_id :title, use: :slugged
  
  validates :title, :presence => true
  validates :position , :numericality => { :greater_than_or_equal_to => 1 }, :unless => Proc.new{ |a| a.position.blank? }
  
  scope :get_footer_links, where(:show_link_in_footer => true)
  scope :footer_links_order, order('position asc, title asc')
  
  def self.footer_links
    get_footer_links.footer_links_order
  end
  
  private
    def auto_position
      self.position = Page.all.count + 1 if self.position.blank?
    end
  
end
