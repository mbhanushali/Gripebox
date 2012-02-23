# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Gripebox::Application.initialize!

Haml::Template.options[:format] = :html5

Gripebox::Application.config.middleware.use ExceptionNotifier,
 :email_prefix => "[Gripebox Exception] ",
 :sender_address => %{"notifier" <support@gripebox.com>},
 :exception_recipients => %w{mayur.rails@gmail.com},
 :sections => %w{my_section1 my_section2} + ExceptionNotifier::Notifier.default_sections