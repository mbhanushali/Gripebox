module ApplicationHelper
  def get_no_follow(is_no_follow)
    (is_no_follow)?("NOFOLLOW"):("FOLLOW")
  end
  
  def get_no_index(is_no_index)
    (is_no_index)?("NOINDEX"):("INDEX")
  end
  
  def get_no_follow_no_index(is_no_follow,is_no_index)
    no_follow = get_no_follow(is_no_follow)
    no_index = get_no_index(is_no_index)
    get_join_string(no_follow,no_index)
  end
  
  def robot_meta_tag(is_no_follow, is_no_index)
    robot_meta_tag = "<META NAME='ROBOTS' CONTENT='#{get_no_follow_no_index(is_no_follow,is_no_index)}' />"
  end
  
  def get_join_string(a,b)
    c = []
    c << a
    c << b
    c.reject(&:blank?).join(',')    
  end
  
  def footer_menu
    menu = ""
    counter = 0
    total_footer_links = Page.footer_links.count
    Page.footer_links.each do |page|
      counter += 1
      menu = menu + "<li>" + link_to(page.title, page_path(page), :rel => "#{get_no_follow_no_index(page.make_no_follow,page.make_no_index)}") + join_footer_links(counter,total_footer_links)  + "<li/>"
    end
    return raw(menu)
  end
  
  def join_footer_links(a,b)
    (a == b)?(""):(" &#183;")
  end
  
	def checkAuthorGripe?(author_id)
		if user_signed_in?
			current_user.id == author_id ? true : false
		else
			false	
		end	
	end
	
	def page_title
		(@meta_title.nil?)?(DefaultSetting.last.page_title):(@meta_title)
	end

	def page_meta_description
		(@meta_description.nil?)?(DefaultSetting.last.meta_description):(@meta_description)
	end

	def page_meta_keywords
		(@meta_keywords.nil?)?(DefaultSetting.last.meta_keywords):(@meta_keywords)
	end

end
