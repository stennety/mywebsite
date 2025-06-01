---

published: true
title: About this site
---
I wanted to write a quick post about the architecture of this site for those who may be interested. 

This site is powered by [Jekyll](https://jekyllrb.com/). I'd previously had it on Wordpress, but moved to Jekyll because it's a static site generator. 

Advantages of using a static site generator:
* Fewer moving parts
* Much better security by not having a database behind the scenes
* Improved performance; serving static HTML requires minimal server resources
* Simpler scalability
* Version control for all content
* Git-based workflow
* Free hosting on [GitHub Pages](https://pages.github.com/) (or very cheap hosting on S3)

I keep the source in [GitHub](https://github.com/davidmerrick/davidmerrick.me), with a [Travis CI pipeline](https://travis-ci.org/davidmerrick/davidmerrick.me) that deploys the latest version to an S3 bucket. The assets for the site (images, etc) are hosted outside version control, in a separate S3 bucket. I did this to minimize the footprint of the source. I don't generally change the images in my posts, so it didn't make sense to have version control on those anyway.

Initially, I had the site hosted on [GitHub Pages](https://pages.github.com/), which worked well for awhile, but I decided to transition it to an S3 bucket so that I could use custom Jekyll plugins. I wrote [this post](https://www.davidmerrick.me/2017/05/24/moving-my-jekyll-website-from-github-pages-to-s3/) on how I went about making that transition.

I fronted the site with [CloudFlare](https://www.cloudflare.com/). This serves the function of giving me a free SSL cert and leveraging both CloudFlare's CDN and DDoS protection features.

I generally use [prose.io](prose.io) to edit the posts. This allows me to author posts from my mobile device, as well. My prose config can be found [here](https://github.com/davidmerrick/davidmerrick.me/blob/master/_prose.yml).

For comments, I use [Disqus](https://disqus.com/). It's just a simple bit of script that's added to the site.

I use [Google Analytics](https://analytics.google.com/analytics/web/#report/defaultid/a69058623w105984732p110320737/) to track page views. I also use [Pingdom](https://www.pingdom.com/) to track outages, as well as page load speed. I have a Slack notification from Pingdom set to trigger if the site is unresponsive.
