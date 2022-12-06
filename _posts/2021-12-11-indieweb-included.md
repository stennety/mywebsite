---
title: IndieWeb Included
description: I detail the IndieWeb approach I have made with my website to make it more compatible with the wider web.
date: 2021-12-11
tags: [html, code, blogging, indieweb, microformats, seo, paulfosterdesign]
syndicated: ['https://news.indieweb.org/en/www.paulfosterdesign.co.uk/blog/indieweb-included/']
---

In my [2017 year review](/blog/year-review-2017/), I expressed my frustration with content discovery via third-party sites.

> Content takes time to put together and it has become a little frustrating that algorithms are now firmly in the middle, deciding to show content that I have shared and made available. The non-chronological feed is a lottery.

This year I decided to make my site further compatible with the wider web and let my content be found and shared more organically.

The IndieWeb is a community that advocates for the individual (hence indie) web. Personal places for your content before third-party silos, outside of your control. 

## Indie Already

Looking to go more indie, I soon discovered I had taken some of the steps without knowing it. 

* Copied previous blog content from [my Tumblr](/work/print-theme/) across, when I added a blog to this portfolio site.
* Cross-posted my posts, by syndicating to CodePen Posts and my personal WordPress blog.
* I’ve had an RSS feed since ~2007! I hand-coded it back in those static site days.

## Added IndieWeb

I wanted to be more indie and there were a few layers to the process. Here’s what I added:

### Rel Me

Social networking icons are new as of the [recent redesign](/blog/portfolio-redesign-2020/). The included `rel="me"` link attributes ties my profiles to my website (identity). This has the added benefit of allowing you to use IndieAuth to sign-in to various services without having to create yet another account.

### Microformats

My posts have long included a hidden footer to combat site scraping. It was the perfect place to include microformats (h-entry properties) as it already contained the appropriate markup: post title, permalink, author, date etc. 

This markup is important to provide meta data to other sites your content may link to. Similar to Open Graph tags.

_An earlier version of my portfolio included hcard on my contact page, which could generate a contact card (vcard) download._

### Webmentions

IndieWeb sounds like independent, but much of it is about sharing.

With search engines and social networks all increasingly limiting the amount reach your content has, having similar sites commenting, mentioning and linking to each other, benefits discovery and dialogue.

[Webmentions](https://indieweb.org/webmentions/) use microformats to allow you to contribute to [discussions across websites](/blog/mobile-browser-choice/). With compatible sites, when you link to or respond to posts, the author is notified of your post and can include a link back or excerpt to your post. Think, a more detailed pingback. Plus, as your content is represented elsewhere, you should ensure it’s accurate and displays well.

_My post [HTML Elements Test](/blog/html-elements-test/) has webmentions._

### Syndication

Speaking of your content represented elsewhere. I can include syndication links in the footer of relevant posts I have cross-posted to other services.

This will be familiar if you have looked in to SEO. Getting those inbound canonical links back to your original page. This allows search engines to follow the relationship between the original and reposts and avoid punishment for duplicated content.

I always included links back to my original posts for this reason and to convince Google my original post was the original. Hopefully it will help prevent cases where _my posts_ are outranked by the same post syndicated elsewhere. 

### Notes

I haven’t yet implemented them, but I’m intrigued by the idea of notes (a status or reply) posts which cross-post to Twitter or other select networks.

## Indie Outcome

My site is a lot more indie than before. I have sent and received webmentions and my site is more wired in to the web.

Ultimately you have to take ownership of your content because third parties have proven unreliable or willing to change the game many times. Use your site as the source of truth and your content can always be found as long as you want it to be.

For further info to be more indie, [indieweb.org](https://indieweb.org) is the place to start.

{% include mentions.html %}
