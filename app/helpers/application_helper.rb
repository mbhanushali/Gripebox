module ApplicationHelper
	def checkAuthorGripe?(author_id)
		if user_signed_in?
			current_user.id == author_id ? true : false
		else
			false	
		end	
	end
end
