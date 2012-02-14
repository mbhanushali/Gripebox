class GripesController < ApplicationController

  before_filter :authenticate_user!, :except => [:show, :index, :filter]
    
  # GET /gripes
  # GET /gripes.json
  def index
    @gripes = Gripe.order('created_at DESC').all

    @title = "Gripebox.com | Gripes"

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @gripes }
    end
  end

  def power
    @gripes = Gripe.find(params['id'])
    render :text => @gripes.power
  end

  def embed_save

    @gripe = Gripe.find(params['idE'])

    params['ResultArrayE'].split(':::').each do |media|

      @file = FileGripe.where('url = ?', media.split('::').first).limit(1)

      if @file.present?
        file_old = FileGripe.find_by_url(media.split('::').first)
        file_old.overview = media.split('::').last.to_s
        file_old.save
      else
        file = FileGripe.new
        file.gripe_id = params['idE']
        file.overview = media.split('::').last

        if params['type'] == 'image'
          file.mimetype = 'embed_image'
        else
          file.mimetype = 'embed_video'
        end

        file.url = media.split('::').first
        file.save
      end
    end

    @activity = Activity.new
    @activity.gripe_id = params['idE']
    @activity.what = "Update"
    @activity.save

  end

  def image_update
    @gripe = Gripe.find(params['id'])

    params['ResultArray'].split(':::').each do |media|

      @file = FileGripe.where('file_upload_id = ?', media.split('::').first).limit(1)

      if @file.present?
        file_old = FileGripe.find_by_file_upload_id(media.split('::').first)
        file_old.overview = media.split('::').last.to_s
        file_old.save
      else
        file = FileGripe.new
        file.gripe_id = params['id']
        file.file_upload_id = media.split('::').first
        file.overview = media.split('::').last
        file.mimetype = FileUpload.find(media.split('::').first).source.present? ? 'video' : 'image' 
        file.save
      end
    end

    @activity = Activity.new
    @activity.gripe_id = params['id']
    @activity.what = "Update"
    @activity.save

  end

  def video_update
    @gripe = Gripe.find(params['id'])

    params['ResultArray'].split(':::').each do |media|

      @file = FileGripe.where('file_upload_id = ?', media.split('::').first).limit(1)

      if @file.present?
        file_old = FileGripe.find_by_file_upload_id(media.split('::').first)
        file_old.overview = media.split('::').last.to_s
        file_old.save
      else
        file = FileGripe.new
        file.gripe_id = params['id']
        file.file_upload_id = media.split('::').first
        file.overview = media.split('::').last
        file.mimetype = FileUpload.find(media.split('::').first).source.present? ? 'video' : 'image' 
        file.save
      end
    end

    @activity = Activity.new
    @activity.gripe_id = params['id']
    @activity.what = "Update"
    @activity.save

  end

  def text_update
    @update = GripeText.new
    @update.content = params['update']
    @update.gripe_id = params['id']
    @update.save

    @activity = Activity.new
    @activity.gripe_id = params['id']
    @activity.what = "Update"
    @activity.save    

    @update = GripeText.where('gripe_id = ?',params['id']).last
  end

  def comment
    @gripe = Gripe.find(params['id'])
    @user_who_commented = current_user
    @comment = Comment.build_from(@gripe, @user_who_commented.id, params['comment'])
    params['status'] ? @comment.parent_id = params['reply_id'] : nil
    @comment.save

    @activity = Activity.new
    @activity.gripe_id = params['id']
    @activity.what = "New comment"
    @activity.save

    @comment = Comment.where("user_id = ?", current_user.id).last
  end

  def filter

    @gripes = Gripe

    if params[:search] != ""
      unless params['tagsids'].first == ""
        @gripes = @gripes.search(params['tagsids'] + params[:search])
      else
        @gripes = @gripes.search(params[:search])
      end
    else
      unless params['tagsids'].first == ""
        @gripes = @gripes.search(params['tagsids'])
      end
    end

    if params[:search] != "" || params['tagsids'].first != ""

      gripe_ids = Array.new

      @gripes.each do |gripe|
        gripe_ids.push(gripe.id)
      end
        
      @gripes = Gripe    
    end  

    unless gripe_ids.nil?
      @gripes = @gripes.where("id in (?)",gripe_ids)
    end  

    if params['hidden-userid']
      @gripes = @gripes.where('user_id = ?', params['hidden-userid'])
    end

    order = Array[]

    video = Array['video','embed_video']
    image = Array['image','embed_image']

    if (params['mediaids'].include? "video") && (params['mediaids'].include? "photos")
      @gripes = @gripes.joins(:file_gripe).where('file_gripes.mimetype' => video + image)
    else
      if params['mediaids'].include? "video"  
        @gripes = @gripes.joins(:file_gripe).where('file_gripes.mimetype' => video)
      end
      if params['mediaids'].include? "photos"
        @gripes = @gripes.joins(:file_gripe).where('file_gripes.mimetype' => image)
      end    
    end    

    if params['power'] == "strong"
      #@gripes = @gripes.order(:power)
      order << "power ASC"
    end

    if params['power'] == "weak"
      #@gripes = @gripes.order(:power).reverse_order
      order << "power DESC"
    end

    if params['sortids'].include? "comments"
      #@gripes = @gripes.order(:comm_count)
      order << "comm_count DESC"
    end

    if params['sortids'].include? "views"
      #@gripes = @gripes.order(:comments_count)
      order << "comments_count DESC"
    end    

    if params['sortids'].include? "activity"
      #@gripes = @gripes.order('latest_activity ASC')
      order << "latest_activity ASC"
    end

    if params['sortdate'] == "top"
      #@gripes = @gripes.order(:created_at)
      order << "created_at DESC"
    end

    if params['sortdate'] == "down"
      #@gripes = @gripes.order(:created_at).reverse_order
      order << "created_at ASC"
    end

    #render :text => order
    @gripes = @gripes.order(order)

    @gripes = @gripes.uniq

    raise ActionController::RoutingError.new('Not Found') unless @gripes.count > 0

  end

  def mygripes
    @gripes = Gripe.where("user_id = ?", current_user.id).order('created_at DESC').limit(5)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @gripes }
    end    
  end

  def subscription
    if params['id']
      @subscription = Subscription.find_by_gripe_id(params['id'])
      if @subscription.present?
        @subscription.destroy
      else
        @subscription = Subscription.new
        @subscription.user = current_user
        @subscription.gripe_id = params['id']
        @subscription.save
      end  
    end 
  end

  def rate
    @rate = Rate.where('gripe_id = ? AND user_id = ?', params['id'], current_user.id).limit(1)
    unless @rate.present?
      @rate = Rate.new
      @rate.gripe_id = params['id']
      @rate.value = params['mode'] == "positive" ? 0 : 1
      @rate.user = current_user
      @rate.save
      gripe = Gripe.find(params[:id])
      unless current_user.id == gripe.user_id
        call_rake(:send_facebook_amp, :user_id => current_user.id, :gripe_title => gripe.title, :gripe_text => gripe.overview[0..17] + "...")
        call_rake(:send_twitter_amp, :user_id => current_user.id, :gripe_title => gripe.title, :gripe_text => gripe.overview[0..17] + "...")
      end  
    else
      raise ActionController::RoutingError.new('Not Found')
    end
    @gripe = Gripe.find(params['id'])
  end

  # GET /gripes/1
  # GET /gripes/1.json
  def show
    @gripe = Gripe.find(params[:id])

    @title = "Gripebox.com | " + @gripe.title.to_s

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @gripe }
    end
  end

  # GET /gripes/new
  # GET /gripes/new.json
  def new
    @gripe = Gripe.new
    @uuid = (0..29).to_a.map {|x| rand(10)}.join()

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @gripe }
    end
  end

  # GET /gripes/1/edit
  def edit
    @gripe = Gripe.find(params[:id])
  end

  # POST /gripes
  # POST /gripes.json
  def create
    @gripe = Gripe.new(params[:gripe])

    @gripe.user = current_user
    
    respond_to do |format|
      if @gripe.save

        if params['arrayFiles']
          params['arrayFiles'].split(':::').each do |media|
            @file_type = media.split('::')[1]
            if @file_type == 'undefined'
              @media = FileGripe.new
              @media.gripe_id = @gripe.id
              @media.file_upload_id = media.split('::').first
              @media.overview = media.split('::').last
              @media.mimetype = FileUpload.find(media.split('::').first).source.present? ? 'video' : 'image' 
              @media.save
            else
              @media = FileGripe.find(media.split('::').first.to_s)
              @media.gripe_id = @gripe.id
              @media.overview = media.split('::').last
              @media.save
            end
          end  
        end

        call_rake(:send_facebook_new, :user_id => current_user.id, :gripe_title => params[:gripe][:title], :gripe_text => params[:gripe][:overview][0..17] + "...")
        call_rake(:send_twitter_new, :user_id => current_user.id, :gripe_title => params[:gripe][:title], :gripe_text => params[:gripe][:overview][0..17] + "...")

        format.html { redirect_to mygripes_path }
        format.json { render json: @gripe, status: :created, location: @gripe }
      else
        format.html { render action: "new" }
        format.json { render json: @gripe.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /gripes/1
  # PUT /gripes/1.json
  def update
    @gripe = Gripe.find(params[:id])

    respond_to do |format|
      if @gripe.update_attributes(params[:gripe])
        format.html { redirect_to @gripe, notice: 'Gripe was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @gripe.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /gripes/1
  # DELETE /gripes/1.json
  def destroy
    @gripe = Gripe.find(params[:id])
    @gripe.destroy

    respond_to do |format|
      format.html { redirect_to gripes_url }
      format.json { head :ok }
    end
  end
end
    
