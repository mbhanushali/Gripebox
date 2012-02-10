require 'oembed'
class EmbedDetailsController < ApplicationController
  def create
    @url = params[:embed_url]
    @provider = get_provider_name(@url)
    resource = get_resource(@provider,@url)
    if resource == "photo"
      file_gripe = FileGripe.create!(:mimetype => 'embed_image', :url => @url)
      respond_to do |format|
        format.js { render :json => {:type => "photo", :html => '<div class="block-edit-image nobg"><div class="bl-img"><img src="'+ @url +'" alt="" embed="img" style="width:55px;height:55px;margin:0pt;" original="' + file_gripe.id.to_s + '"></div><div class="bl-content"><span class="span_val">Add are description.</span><textarea default="Add are description." class="tips ed-text"></textarea><div class="bl-delete">x delete</div><div class="clear"></div></div><div class="clear"></div></div>', :src => @url, :id => file_gripe.id  }}
      end      
    elsif resource.video?
    	@src = resource.html.to_s
    	@thumbnail_url = (resource.methods.include? :thumbnail_url)?(resource.thumbnail_url.to_s):('')
    	file_gripe = FileGripe.create!(:mimetype => 'embed_video', :url => @src, :thumbnail_url => @thumbnail_url)
      respond_to do |format|
        format.js { render :json => {:type => resource.type.to_s , :thumbnail_url => @thumbnail_url.to_s, :src => @src, :id => file_gripe.id, :html => '<div class="block-edit-image nobg"><div class="bl-img"><img src="' + @thumbnail_url.to_s + '" alt="" embed="video" style="width:55px;height:55px;margin:0pt;" original="' + file_gripe.id.to_s + '"></div><div class="bl-content"><span class="span_val">Add are description.</span><textarea default="Add are description." class="tips ed-text"></textarea><div class="bl-delete">x delete</div><div class="clear"></div></div><div class="clear"></div></div>' }}
      end
    elsif resource.photo?
      @src = resource.html.to_s.gsub("<img src='",'').gsub("' />",'')
      file_gripe = FileGripe.create!(:mimetype => 'embed_image', :url => @src)
      respond_to do |format|
        format.js { render :json => {:type => resource.type, :html => '<div class="block-edit-image nobg"><div class="bl-img"><img src="'+ @src +'" alt="" embed="img" style="width:55px;height:55px;margin:0pt;" original="' + file_gripe.id.to_s + '"></div><div class="bl-content"><span class="span_val">Add are description.</span><textarea default="Add are description." class="tips ed-text"></textarea><div class="bl-delete">x delete</div><div class="clear"></div></div><div class="clear"></div></div>', :src => @src, :id => file_gripe.id  }}
      end
    end
  end
  
  private
  def get_provider_name(url)
    @provider_name = ''
    @providers = ["youtube","flickr","viddler","qik.com","revision3","hulu","vimeo","instagram","slideshare", "yfrog.com","majorleaguegaming","polleverywhere","my.opera","clearspring","nfb.ca","scribd", "movieclips","23hq","jpg","png","gif","bmp","ico","jpeg"]
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
      @changed_url = @url.gsub('http','').gsub(':','').gsub('//','').gsub('www.youtube.com/','').gsub('embed/','').gsub('watch?v=','').gsub('youtube.com/')
      @changed_url = "http://www.youtube.com/watch?v="+@changed_url
      OEmbed::Providers::Youtube.get(@changed_url)
    when "flickr"
      OEmbed::Providers::Flickr.get(@url)
    when "viddler"
    	@changed_url = @url.gsub('http','').gsub(':','').gsub('//','').gsub('www.viddler.com/','').gsub('embed/','').gsub('v/','').gsub('/?f=1&autoplay=0&player=full&loop=false&nologo=false&hd=false','')
    	@changed_url = "http://www.viddler.com/v/"+@changed_url
      OEmbed::Providers::Viddler.get(@changed_url)
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
    when "jpg","png","gif","bmp","ico","jpeg"
      "photo"
    else
      ''
    end
    return resource
  end
end
