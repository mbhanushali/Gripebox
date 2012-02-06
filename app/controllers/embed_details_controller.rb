require 'oembed'
class EmbedDetailsController < ApplicationController
  def create
    @url = params[:embed_url]
    @provider = get_provider_name(@url)
    resource = get_resource(@provider,@url)
    if resource.video?
      respond_to do |format|
        format.js { render :json => {:type => resource.type, :thumbnail_url => resource.thumbnail_url, :html => resource.html}}
      end
    elsif resource.photo?
      @src = resource.html.to_s.gsub("<img src='",'').gsub("' />",'')
      file_gripe = FileGripe.create!(:mimetype => 'embed_image', :url => @src)
      respond_to do |format|
        format.js { render :json => {:type => resource.type, :html => '<div class="block-edit-image"><div class="bl-img"><img src="'+ @src +'" alt="" embed="img" style="width:55px;height:55px;margin:0pt;" class="newI"></div><div class="bl-content"><span class="span_val">Add are description.</span><textarea default="Add are description." class="tips ed-text"></textarea><div class="bl-delete">x delete</div><div class="clear"></div></div><div class="clear"></div></div>', :src => @src, :file_gripe_id => file_gripe.id  }}
      end
    end
  end
  
  private
  def get_provider_name(url)
    @provider_name = ''
    @providers = ["youtube","flickr","viddler","qik.com","revision3","hulu","vimeo","instagram","slideshare","yfrog.com","majorleaguegaming","polleverywhere","my.opera","clearspring","nfb.ca","scribd","movieclips","23hq"]
    @providers.each do |provider|
      if url.include?(provider)
        @provider_name = provider
        break
      end
    end
    return @provider_name
  end
  
  def get_resource(provider, url)
    @url = url
    resource = case provider
    when "youtube"
      @changed_url = @url.gsub('http','').gsub(':','').gsub('//','').gsub('www.youtube.com/','').gsub('embed/','').gsub('watch?v=','')
      @changed_url = "http://www.youtube.com/watch?v="+@changed_url
      OEmbed::Providers::Youtube.get(@changed_url)
    when "flickr"
      OEmbed::Providers::Flickr.get(@url)
    when "viddler"
      OEmbed::Providers::Viddler.get(@url)
    when "qik.com"
      OEmbed::Providers::Qik.get(@url)
    when "revision3"
      OEmbed::Providers::Revision3.get(@url)
    when "hulu"
      OEmbed::Providers::Hulu.get(@url)
    when "vimeo"
      OEmbed::Providers::Vimeo.get(@url)
    when "instagram"
      OEmbed::Providers::Instagram.get(@url)
    when "slideshare"
      OEmbed::Providers::Slideshare.get(@url)
    when "yfrog.com"
      OEmbed::Providers::Yfrog.get(@url)
    when "majorleaguegaming"
      OEmbed::Providers::MlgTv.get(@url)
    when "polleverywhere"
      OEmbed::Providers::PollEverywhere.get(@url)
    when "my.opera"
      OEmbed::Providers::MyOpera.get(@url)
    when "clearspring"
      OEmbed::Providers::ClearspringWidgets.get(@url)
    when "nfb.ca"
      OEmbed::Providers::NFBCanada.get(@url)
    when "scribd"
      OEmbed::Providers::Scribd.get(@url)
    when "movieclips"
      OEmbed::Providers::MovieClips.get(@url)
    when "23hq"
      OEmbed::Providers::TwentyThree.get(@url)
    else
      ''
    end
    return resource
  end
end
