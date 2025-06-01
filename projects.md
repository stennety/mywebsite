---
layout: single
title: Side Projects
permalink: /projects/
published: true
---

For my latest projects, please check out my [GitHub](https://github.com/davidmerrick)!

## 2019

[PodRoulette](https://github.com/davidmerrick/podroulette)

RSS feed combined with an iOS shortcut to pick a random podcast to listen to.

[partymode](https://github.com/davidmerrick/partymode)

Slack-controlled bot that uses Twilio to buzz people into my building automatically when enabled.

> Stack: Kotlin, Serverless

## 2018

[PDXAlerts](https://github.com/davidmerrick/PDXAlerts)

Alexa skill that fetches the latest tweets from [@PDXAlerts](https://twitter.com/pdxalerts).

> Stack: Kotlin

## 2017

[Trump Report](https://tr.davidmerrick.me/)

Performs sentiment analysis and classification of Trump Tweets using IBM Watson APIs.

> Tech Used: ReactJS, Redux, IBM Watson, AWS Lambda, AWS S3, AWS API Gateway, Gulp.

[Naive Bayes Trainer](https://github.com/davidmerrick/Naive-Bayes-Trainer)

Webapp for training and testing a Naive Bayes classifier on a set of text.

> Tech Used: ReactJS, Gulp, Socket.io, Express, and Redux.

[Alexa-TriMet](https://www.davidmerrick.me/2017/04/26/alexa-skill-for-trimet-arrivals/)

Alexa skill that fetches the latest arrivals for TriMet buses and trains in Portland.

> Tech Used: AWS Lambda, NodeJS, Gulp, TriMet API.

[Alexa-PackWeight](https://github.com/davidmerrick/alexa-pack-weight)

Alexa skill that records my backpack weight to a Google Spreadsheet.

> Tech Used: AWS Lambda, NodeJS, Gulp, Google Spreadsheets API.

[AWS IoT button control of Sonos Speakers](https://youtu.be/xUQ8kxjlXlA)

I wired up an AWS IoT button to a Lambda function that plays/pauses Sonos speakers.
This required a Raspberry Pi running on my local network to control the speakers.
To deploy the app and add a public URL, I used Resin.io.

{% include video id="xUQ8kxjlXlA" provider="youtube" %}

> Tech Used: AWS Lambda, Docker, NodeJS, Resin.io, Raspberry Pi.

[Resin.io Sonos API](https://github.com/davidmerrick/rpi-node-sonos-http-api)

This is a fork of a Sonos API app written in NodeJS. I enabled HTTP auth by default, and
added a Dockerfile so that it could be deployed to a Raspberry Pi via Resin.io.

> Tech Used: AWS Lambda, Docker, NodeJS, Raspberry Pi.

[Trump Survey Spammer](https://github.com/davidmerrick/trump-survey-spammer)

Essentially, a Chrome extension designed to repeatedly spam Trump's "media accountability survey"
with randomized data. Used Google Analytics to track the number of survey submissions.

> Tech Used: NodeJS, Chrome extension API.

[Resin.io bandwidth monitor](https://www.davidmerrick.me/2017/04/17/monitoring-your-internet-speed-with-resin-io-and-datadog/)

App that periodically records home Internet upload and download speeds and records the metrics to DataDog.

> Tech Used: NodeJS, Docker, Resin.io, DataDog API.

## 2016

[GeoTagged images Heatmap generator](https://www.davidmerrick.me/2016/10/30/how-to-generate-heatmaps-from-geotagged-images/)

Dockerized NodeJS app which generates a heatmap given a set of geotagged images.
Uses the Google Maps API.

[Upside-Down-Ternet](https://github.com/davidmerrick/Upside-Down-Ternet)

Prank Chrome extension that flips web pages upside down.

[Raspberry Pi Kubernetes Cluster](https://www.davidmerrick.me/2016/02/16/building-a-raspberry-pi-powered-kubernetes-cluster/)

I built a Raspberry Pi-powered Kubernetes cluster based on HypriotOS.

> Tech Used: Raspberry Pi, Docker, Kubernetes.

## 2015

[Monkeys to let guests in](https://www.youtube.com/watch?v=AVWJAWrHDKI)

I used the Twilio API and Heroku to build an automated phone number that would play
monkey sounds and then send the DTMF code to let guests in to my building:
{% include video id="AVWJAWrHDKI" provider="youtube" %}

## 2014

[Google Street View Hyperlapse](https://github.com/davidmerrick/Street-View-Hyperlapse)

I forked a really cool project I'd found that renders hyperlapses from Google Street View imagery.
I added the ability to export the images from the canvas element the hyperlapse was rendered in,
in order to create my own YouTube video from it.

## Previous

[Coolest Guy in America](https://coolestguyinamerica.com/)

In 2009, I wanted to see if I could get a website to rank for the first Google search result for
"Coolest Guy in America." So I learned about SEO and was able to get the site ranked in a couple weeks.
