# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120116095531) do

  create_table "activities", :force => true do |t|
    t.integer  "gripe_id"
    t.string   "what"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "activities", ["gripe_id"], :name => "index_activities_on_gripe_id"

  create_table "authentications", :force => true do |t|
    t.integer  "user_id"
    t.string   "provider"
    t.string   "uid"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.string   "token"
    t.string   "secret"
    t.boolean  "create_a_gripe"
    t.boolean  "amp_up"
  end

  create_table "buzzs", :force => true do |t|
    t.string   "tag"
    t.integer  "count",      :default => 0
    t.string   "period"
    t.boolean  "published",  :default => true
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "comments", :force => true do |t|
    t.integer  "commentable_id",   :default => 0
    t.string   "commentable_type", :default => ""
    t.string   "title",            :default => ""
    t.text     "body"
    t.string   "subject",          :default => ""
    t.integer  "user_id",          :default => 0,  :null => false
    t.integer  "parent_id"
    t.integer  "lft"
    t.integer  "rgt"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["commentable_id"], :name => "index_comments_on_commentable_id"
  add_index "comments", ["user_id"], :name => "index_comments_on_user_id"

  create_table "email_mes", :force => true do |t|
    t.integer  "user_id"
    t.boolean  "update_comments"
    t.boolean  "update_subscriptions"
    t.boolean  "get_top_gripes_a_week"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "email_mes", ["user_id"], :name => "index_email_mes_on_user_id"

  create_table "facebook_activities", :force => true do |t|
    t.integer  "user_id"
    t.boolean  "gripe"
    t.boolean  "amp"
    t.string   "access_token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "facebook_activities", ["user_id"], :name => "index_facebook_activities_on_user_id"

  create_table "file_gripes", :force => true do |t|
    t.integer  "file_upload_id"
    t.integer  "gripe_id"
    t.text     "overview"
    t.string   "mimetype"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "url"
  end

  add_index "file_gripes", ["file_upload_id"], :name => "index_file_gripes_on_file_upload_id"
  add_index "file_gripes", ["gripe_id"], :name => "index_file_gripes_on_gripe_id"

  create_table "file_uploads", :force => true do |t|
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "source_file_name"
    t.string   "source_content_type"
    t.integer  "source_file_size"
    t.datetime "source_updated_at"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "duration"
  end

  add_index "file_uploads", ["user_id"], :name => "index_file_uploads_on_user_id"

  create_table "footer_images", :force => true do |t|
    t.string   "title"
    t.boolean  "display_on"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "gripe_texts", :force => true do |t|
    t.integer  "gripe_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "content"
  end

  add_index "gripe_texts", ["gripe_id"], :name => "index_gripe_texts_on_gripe_id"

  create_table "gripe_views", :force => true do |t|
    t.integer  "gripe_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "gripe_views", ["gripe_id"], :name => "index_gripe_views_on_gripe_id"

  create_table "gripes", :force => true do |t|
    t.string   "title"
    t.text     "overview"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "comments_count",  :default => 0, :null => false
    t.integer  "comm_count",      :default => 0, :null => false
    t.integer  "power",           :default => 0
    t.datetime "latest_activity"
  end

  add_index "gripes", ["user_id"], :name => "index_gripes_on_user_id"

  create_table "msgs", :force => true do |t|
    t.integer  "activity_id"
    t.boolean  "unread",      :default => false
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "gb"
  end

  add_index "msgs", ["activity_id"], :name => "index_msgs_on_activity_id"
  add_index "msgs", ["user_id"], :name => "index_msgs_on_user_id"

  create_table "news", :force => true do |t|
    t.string   "title"
    t.text     "overview"
    t.text     "embed"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "video_file_name"
    t.string   "video_content_type"
    t.integer  "video_file_size"
    t.datetime "video_updated_at"
  end

  create_table "notifications", :force => true do |t|
    t.string   "title"
    t.string   "status"
    t.string   "label"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "link"
  end

  add_index "notifications", ["user_id"], :name => "index_notifications_on_user_id"

  create_table "rails_admin_histories", :force => true do |t|
    t.text     "message"
    t.string   "username"
    t.integer  "item"
    t.string   "table"
    t.integer  "month",      :limit => 2
    t.integer  "year",       :limit => 8
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "rails_admin_histories", ["item", "table", "month", "year"], :name => "index_rails_admin_histories"

  create_table "rates", :force => true do |t|
    t.integer  "gripe_id"
    t.integer  "value"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "rates", ["gripe_id"], :name => "index_rates_on_gripe_id"
  add_index "rates", ["user_id"], :name => "index_rates_on_user_id"

  create_table "subscriptions", :force => true do |t|
    t.integer  "user_id"
    t.integer  "gripe_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "subscriptions", ["gripe_id"], :name => "index_subscriptions_on_gripe_id"
  add_index "subscriptions", ["user_id"], :name => "index_subscriptions_on_user_id"

  create_table "taggings", :force => true do |t|
    t.integer  "tag_id"
    t.integer  "taggable_id"
    t.string   "taggable_type"
    t.integer  "tagger_id"
    t.string   "tagger_type"
    t.string   "context"
    t.datetime "created_at"
  end

  add_index "taggings", ["tag_id"], :name => "index_taggings_on_tag_id"
  add_index "taggings", ["taggable_id", "taggable_type", "context"], :name => "index_taggings_on_taggable_id_and_taggable_type_and_context"

  create_table "tags", :force => true do |t|
    t.string "name"
  end

  create_table "users", :force => true do |t|
    t.string   "email",                                 :default => "", :null => false
    t.string   "encrypted_password",     :limit => 128, :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                         :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "username"
    t.date     "birthday"
    t.string   "gender"
    t.string   "occupation"
    t.string   "location"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  add_index "users", ["confirmation_token"], :name => "index_users_on_confirmation_token", :unique => true
  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
