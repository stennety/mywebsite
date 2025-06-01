---

published: true
title: Alexa Sonos Intercom
---
This is a recent weekend project I built. 
I had a Sonos system, and thought I'd turn it into an intercom using Alexa as the input. 
Here's a demo:

{% include video id="476RDRVSzSI" provider="youtube" %}

Here's how I put this together:

## 1. Deploy a publicly-accessible Sonos API server with Resin.io

I wrote up a separate post on how to do this [here](https://www.davidmerrick.me/2017/05/16/setting-up-node-sonos-api/).

## 2. Create an AWS Lambda function

Create an AWS Lambda function using the code [here](https://github.com/davidmerrick/alexa-sonos-intercom). This function will be the brains of the Alexa skill.

Set the following environment variables:

* *SONOS_API_SERVER*: Publicly-accessible endpoint of your Sonos API server
* *AUTH_USERNAME* and *AUTH_PASSWORD*: Credentials to perform Basic auth on requests to that server

## 3. Create an Alexa skill

Set up a basic Alexa skill using the [Alexa Skills Kit](https://developer.amazon.com/alexa-skills-kit). Point the skill at the Lambda function you set up in step 2.

For the intent schema and example utterances, use the configuration 
in the [repo](https://github.com/davidmerrick/alexa-sonos-intercom/tree/master/speechAssets) from step 2.

## 4. Done!

You're done. Have fun with your new intercom system!
