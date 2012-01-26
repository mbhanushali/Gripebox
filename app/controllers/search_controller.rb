class SearchController < ApplicationController
  def index
    @gripes = Gripe.search params[:"search-keywords"], :match_mode => :boolean
  end

end
