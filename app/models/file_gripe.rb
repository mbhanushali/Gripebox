class FileGripe < ActiveRecord::Base
  belongs_to :file_upload
  belongs_to :gripe


  after_create :encoding_video


  def encoding_video
    if self.mimetype == 'video'
      path = Rails.root.to_s + "/public/system/sources/" + self.file_upload_id.to_s + "/original/"
      source = path + self.file_upload.source_file_name
      system('ffmpeg -i ' + source + ' -ab 56 -ar 44100 -b 1200 -s 641x344 -f flv -qmax 8 -y ' + path + self.file_upload_id.to_s + '.flv &')
    end
  end

end
