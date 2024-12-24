source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.2.2"

# Core
gem 'rails', '~> 7.0.0'
gem 'puma', '~> 4.1'
gem 'bootsnap', '>= 1.4.2', require: false
gem 'sqlite3', '~> 1.4'
gem 'sass-rails', '>= 6'
gem 'webpacker', '~> 5.4'
gem 'jbuilder', '~> 2.7'

# Authentication
gem 'devise'
gem 'jwt'
gem 'rack-cors'
gem 'rails-i18n'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'rspec-rails'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'rubocop', require: false
  gem 'rubocop-rails', require: false
  gem 'rubocop-rspec', require: false
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.2'
end

group :test do
  gem 'shoulda-matchers'
  gem 'database_cleaner-active_record'
  gem 'rspec-json_expectations'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
