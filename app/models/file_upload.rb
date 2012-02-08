class FileUpload < ActiveRecord::Base
  belongs_to :user
  has_many :file_gripe, :dependent => :destroy
  
  has_attached_file :source
  has_attached_file :image, :styles => { :medium => ["400x420#"], :thumb => ["55x55#"] }
   
  validates_attachment_size :source, :less_than => 240.megabytes

  validates_attachment_content_type :source,
  :content_type => [ 
    'image/gif', 
    'image/jpeg', 
    'image/pjpeg',
    'image/png',
    'image/svg+xml',
    'image/tiff',
    'image/vnd.microsoft.icon',
    'video/mpeg',
    'video/mp4',
    'video/x-m4v',
    'video/ogg',
    'video/quicktime',
    'video/webm',
    'video/x-ms-wmv',
    'video/avi',
    'video/msvideo',
    'video/x-msvideo',
    'application/x-troff-msvideo',
    'video/quicktime',
    'video/x-sgi-movie',
  ],
  :message => 'file must be of filetype jpeg, gif, png, ico'

  after_save :make_screenshot

  def make_screenshot
    if self.source_file_name

      @tmp_path = Rails.root.to_s + '/public/system/sources/' + self.id.to_s + '/original/'
      @tmp_path_file = @tmp_path + self.source_file_name

      s = `ffmpeg -i #{@tmp_path_file} 2>&1`
      if s =~ /Duration: ([\d][\d]):([\d][\d]):([\d][\d])/
        hours = $1
        mins = $2
        seconds =$3
        duration = hours.to_i*3600 + mins.to_i*60 + seconds.to_i
      end

#      if duration < 100
#        @random1 = Random.rand(1..duration).to_s
#      else
        @random1 = Random.rand(4..30).to_s
#      end

      system("/opt/local/bin/ffmpeg  -itsoffset -" + @random1 + " -i " + @tmp_path_file+ " -vcodec mjpeg -vframes 1 -an -f rawvideo -s 55x55 " + @tmp_path + self.id.to_s + ".jpg")
    end  
  end


end
