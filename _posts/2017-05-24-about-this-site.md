---
layout: post
published: false
title: About this site
---
I wanted to write a quick post about the architecture of this site for those who may be interested. 

This site is powered by Jekyll. I have it hosted in GitHub, with a Travis CI pipeline that deploys the latest version to an S3 bucket. The assets for the site (images, etc) are hosted outside version control, in a separate S3 bucket. 

I fronted the site with CloudFlare. This serves the function of giving me a free SSL cert, leveraging both CloudFlare's CDN and DDoS protection features, and saves bandwidth to my S3 bucket.
