require 'rbconfig'
HOST_OS = RbConfig::CONFIG['host_os']

source 'http://rubygems.org'

gem 'rails', '3.1.3'

# Bundle edge Rails instead:
# gem 'rails',     :git => 'git://github.com/rails/rails.git'

gem 'sqlite3'
gem 'mysql2'


# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.1.4'
  gem 'coffee-rails', '~> 3.1.1'
  gem 'uglifier', '>= 1.0.3'
end

if HOST_OS =~ /linux/i
  gem 'therubyracer', '>= 0.9.8'
end

#gem 'jquery-rails'

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'ruby-debug19', :require => 'ruby-debug'

group :test do
  # Pretty printed test output
  gem 'turn', :require => false
end


gem 'haml'

gem 'devise'
gem 'omniauth', '~> 0.3.2'

gem 'rails_admin', :git => 'git://github.com/sferik/rails_admin.git'

gem 'cancan'

gem "nifty-generators", :group => :development
gem "mocha", :group => :test

gem "paperclip", "~> 2.4"

gem 'will_paginate', '~> 3.0'

gem 'acts-as-taggable-on'

gem 'awesome_nested_set'
gem 'acts_as_commentable_with_threading', :git => 'git://github.com/elight/acts_as_commentable_with_threading.git'

gem "squeel"

gem "oauth"

gem "twitter"

gem "koala"

gem 'fb_graph'

gem 'thinking-sphinx', '2.0.10'

gem "thin"

gem "grackle"

gem "friendly_id", "~> 4.0.0"

gem "ckeditor", "3.7.0.rc2"