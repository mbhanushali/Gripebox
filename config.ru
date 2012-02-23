# This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment',  __FILE__)
run Gripebox::Application

Gripebox::Application.config.middleware.use ExceptionNotifier,
 :email_prefix => "[Gripebox Exception] ",
 :sender_address => %{"notifier" <support@gripebox.com>},
 :exception_recipients => %w{mayur.rails@gmail.com},
 :sections => %w{my_section1 my_section2} + ExceptionNotifier::Notifier.default_sections