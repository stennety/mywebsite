# frozen_string_literal: true

source "https://rubygems.org"

gem "jekyll-theme-chirpy", "~> 6.0", ">= 6.0.1"

group :test do
  gem "html-proofer", "~> 5.0.7"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem 'wdm', '~> 0.1.1', :install_if => Gem.win_platform?

# Jekyll <= 4.2.0 compatibility with Ruby 3.0
gem 'nokogiri', '~> 1.15', '>= 1.15.2'

gem "webrick", "~> 1.7"

gem 'jekyll-redirect-from'

gem 'jekyll-compose', group: [:jekyll_plugins]
