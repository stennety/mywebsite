---

published: true
title: Moving my Jekyll website from GitHub Pages to S3
---
A couple months ago, I decided to take the leap and migrate this website from GitHub Pages to S3.

I did this partially to get more exposure to working with AWS, and partially to allow myself the flexibility of adding plugins. GitHub restricts the plugins you can use with Pages to [these](https://pages.github.com/versions/), and I wanted to be able to embed YouTube videos in my posts.

My requirements for the migration were: 
* Custom Jekyll plugins
* Maintaining the convenience of the git-push-to-deploy functionality that GitHub Pages does so well
* Restricting access to the S3 bucket to my [CloudFlare CDN](https://www.cloudflare.com/) to save bandwidth

## Custom Jekyll plugins

The custom plugins part was easy. I was able to pretty quickly integrate the [Jekyll YouTube Embed Plugin](https://gist.github.com/joelverhagen/1805814) into my code.

## Git push to deploy

Setting up push-to-deploy took a little more work, but proved not to be too difficult either.

First, I set up an S3 bucket to host my site. AWS has [excellent documentation](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html) on how to do this.

Next, I configured an IAM role to allow access to this bucket. Just create a user and grant them the "AmazonS3FullAccess" role.

Next, I built out a [Travis CI](https://travis-ci.org/) pipeline to deploy my site on commits. Here is my [Travis YML file](https://github.com/davidmerrick/davidmerrick.me/blob/master/.travis.yml) for that. Travis CI securely injects the S3 credentials and bucket name during builds. I added Slack notifications for failed builds as well.

## Restricting access to the bucket

This was more of an experiment/learning opportunity; AWS already provides pretty good [DDoS protection](https://aws.amazon.com/shield/) on apps running on their infrastructure, and in any case S3 bandwidth is [incredibly cheap](https://aws.amazon.com/s3/pricing/).

I've been using CloudFlare for a free HTTPS cert, and thought it would be interesting to see if I could restrict access to my S3 bucket to just the CloudFlare IPs. I did this with this bit of configuration:

{% gist b520e4e9a94a857e7f8e054ac2e1d2b5 %}

With "bucket-name" being, of course, the name of the bucket.
