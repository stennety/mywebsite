---
layout: post
published: true
title: About this site
---
I wanted to write a quick post about the architecture of this site for those who may be interested. 

This site is powered by [Jekyll](https://jekyllrb.com/). I'd previously had it on Wordpress, but moved to Jekyll because it's a static site generator. 

Advantages of using a static site generator:
* Fewer moving parts
* Much better security by not having a database behind the scenes
* Much better performance from the pages being pre-rendered
* Simpler scalability
* I can host it for free on GitHub pages or for very cheap on S3

I have it hosted in [GitHub](https://github.com/davidmerrick/david-merrick.com), with a [Travis CI pipeline](https://travis-ci.org/davidmerrick/david-merrick.com) that deploys the latest version to an S3 bucket. The assets for the site (images, etc) are hosted outside version control, in a separate S3 bucket. 

I generally use [prose.io](prose.io) to edit the posts. My prose config can be found [here](https://github.com/davidmerrick/david-merrick.com/blob/master/_prose.yml).

I fronted the site with [CloudFlare](https://www.cloudflare.com/). This serves the function of giving me a free SSL cert and leveraging both CloudFlare's CDN and DDoS protection features.

Initially, I had the site hosted on [GitHub Pages](https://pages.github.com/), which worked well for awhile, but I decided to transition it to an S3 bucket so that I could use custom Jekyll plugins. I wrote [this post](https://www.david-merrick.com/2017/05/24/moving-my-jekyll-website-from-github-pages-to-s3/) on how I went about making that transition.
