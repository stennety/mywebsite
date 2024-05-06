---
layout: post
title: Jekyll cheatsheet
---

Jekyll Cheatsheet

Getting Started



Install Jekyll: gem install jekyll bundler

Create a new Jekyll site: jekyll new myblog

Change into the directory: cd myblog


Basic Commands



Build and serve the site: jekyll serve or bundle exec jekyll serve

Build the site without serving: jekyll build

Clean up the site: jekyll clean


Front Matter



YAML front matter syntax:


yaml
Copy Code
---
title: My Blog Post
date: 2023-02-20
categories: blog
---

Accessing front matter variables in Liquid templates: {{ page.title }}


Liquid Templates



Conditional statements:


liquid
Copy Code
{% if page.title == "My Blog Post" %}
  <p>This is my blog post!</p>
{% endif %}

Loops:


liquid
Copy Code
{% for post in site.posts %}
  <h2>{{ post.title }}</h2>
{% endfor %}

Including other templates:


liquid
Copy Code
{% include footer.html %}
Variables and Filters



Site variables: {{ site.title }}

Page variables: {{ page.date | date_to_string }}

Filters:

date_to_string: formats a date as a string

truncatewords: truncates a string to a specified number of words




Layouts and Includes



Defining a layout: _layouts/default.html

Applying a layout to a page: layout: default in the front matter

Including other templates: {% include sidebar.html %}


Posts and Pages



Creating a new post: touch _posts/2023-02-20-my-blog-post.md

Creating a new page: touch about.md


Collections



Defining a collection: collections: [my_collection] in the site's configuration file

Accessing a collection: {{ site.my_collection }}


Configuration



Site configuration file: _config.yml

Setting site variables:


yaml
Copy Code
title: My Blog
baseurl: /blog
Plugins



Installing a plugin: gem install jekyll-plugin

Configuring a plugin: plugins: [jekyll-plugin] in the site's configuration file


Deployment



Building for production: JEKYLL_ENV=production jekyll build

Deploying to GitHub Pages: git push origin gh-pages