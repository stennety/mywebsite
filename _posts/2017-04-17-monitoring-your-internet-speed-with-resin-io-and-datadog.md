---
layout: post
published: true
title: Monitoring your Internet speed with Resin.io and DataDog
---
Occasionally, my home Internet speed slows to a crawl, and I was curious to get some more insight into whether there's a pattern, and to have data to show my ISP if needed.

![]({{site.cdn_path}}/2017/04/17/screenShot1.png)

Some background on [Resin.io](https://resin.io/), in case you're not familiar. I've been using it lately for all my Raspberry Pi projects and am a huge fan. It's a service that makes it incredibly painless to deploy apps to Raspberry Pi (and a bunch of other embedded devices). You don't have to worry about configuring Linux, installing all the prerequisite libraries, getting your app to re-run on restart, etc. Just throw together a Docker container with your app, install ResinOS on your SD card, plug in the Pi, and deploy. 

I wrote a NodeJS app that I deployed via Resin, which runs a speed test and uploads the results to DataDog on a predefined interval.

## Prerequisites

1. A Raspberry Pi :-).
2. Set up accounts at [Resin.io](https://resin.io/) and [DataDog](https://www.datadoghq.com/).
3. Get a DataDog API key [here](https://app.datadoghq.com/account/settings#api).
4. Set up a Resin.io app using their [quick start instructions](https://docs.resin.io/raspberrypi/nodejs/getting-started/).

## Setup instructions

1. In your Resin.io app, set the "DATADOG_API_KEY" environment variable to the key you obtained in step 3 of the prerequisites.
2. Clone my [bandwidth monitor repo](https://github.com/davidmerrick/DataDog-Bandwidth-Monitor):
{% gist davidmerrick/3c5a499c26daa9b29264896af658bcd3 %}
3. cd into this repo, add a remote for your Resin.io project, and push to it:
{% gist davidmerrick/42b88791faa4966731f1532d862bb3c5 %}
4. Your app will deploy, your Raspberry Pi will download it from Resin, and very soon you'll have data flowing into your DataDog dashboard for monitoring your Internet speeds.

## IMPORTANT

I used [node-inspector](https://github.com/node-inspector/node-inspector) to do a little digging into the amount of bandwidth used up by the speed test itself, and it's actually quite substantial. 

![]({{site.cdn_path}}/2017/04/17/screenShot2.png)

Be careful about setting the interval to anything more frequent than 20 minutes, as that interval alone could use almost 50 GB per month (24.7 MB * (60/20) times per hour * 24 hrs per day * 28 days per month).
