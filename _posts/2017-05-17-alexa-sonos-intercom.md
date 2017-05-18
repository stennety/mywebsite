---
layout: post
published: true
title: Alexa Sonos intercom
---
This is a recent weekend project I built. I had a Sonos system, and thought I'd turn it into an intercom using Alexa as the input. Here's a demo:

{% youtube 476RDRVSzSI %}

Here's how I put this together:

## 1. Deploy a publicly-accessible Sonos API server with Resin.io

I wrote up a separate post on how to do this [here](https://www.david-merrick.com/2017/05/16/setting-up-node-sonos-api/).

## 2. Create a Lambda function

Create a Lambda function using the code [here](https://github.com/davidmerrick/alexa-sonos-intercom).

Set the following environment variables:

* *SONOS_API_SERVER*: Publicly-accessible endpoint of your Sonos API server
* *AUTH_USERNAME* and *AUTH_PASSWORD*: Credentials to perform Basic auth on requests to that server

## 3. Create an Alexa skill

Set up a basic Alexa skill using the [Alexa Skills Kit](https://developer.amazon.com/alexa-skills-kit).

For the intent schema and example utterances, use the configuration in the [repo](https://github.com/davidmerrick/alexa-sonos-intercom/tree/master/speechAssets) from step 2.

## 4. Done!

You're done. Have fun with your new intercom system!
