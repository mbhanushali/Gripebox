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
	
	def page_ads_one
		raw(DefaultSetting.last.ads_code1)
	end

	def page_ads_two
		raw(DefaultSetting.last.ads_code2)
	end

	def page_ads_three
		raw(DefaultSetting.last.ads_code3)
	end

	def page_ads_four
		raw(DefaultSetting.last.ads_code4)
	end

	def page_ads_five
		raw(DefaultSetting.last.ads_code5)
	end
	
	def script_one
	  raw(DefaultSetting.last.script1)
  end

	def script_two
	  raw(DefaultSetting.last.script2)
  end

	def script_three
	  raw(DefaultSetting.last.script3)
  end

	def script_four
	  raw(DefaultSetting.last.script4)
  end

	def script_five
	  raw(DefaultSetting.last.script5)
  end
  
  def background_color
    (DefaultSetting.last.background_color.blank?)?("#FFFFFF"):(raw(DefaultSetting.last.background_color))
  end

end
