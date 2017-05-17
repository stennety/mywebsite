---
layout: post
published: true
title: Setting up a Node Sonos API using Resin.io
---

I wanted to build some home automation on my Sonos speakers. After some research, I decided that the most straightforward
way to do this would be to fork a project I'd found on GitHub into [this one](https://github.com/davidmerrick/rpi-node-sonos-http-api),
change some of the default settings, and add a Dockerfile so it could be deployed to a Raspberry Pi via [Resin.io](https://resin.io/).

The other advantage of using Resin is that it provides the ability to [forward a public URL](https://docs.resin.io/management/devices/#enable-public-device-url) 
to your Pi without having to deal with NAT traversal.

So, let's get started.

## 1. Set up your Resin project and install ResinOS
 
Instructions for this can be found [here](https://docs.resin.io/examples/projects/).

## 2. Push to Resin remote

Clone [my repo](https://github.com/davidmerrick/rpi-node-sonos-http-api), add your Resin remote, then push to there ([instructions](https://docs.resin.io/deployment/deployment/)).

![resin_git_remote.png]({{site.cdn_path}}/2017/05/16/resin_git_remote.png)

It'll take a few minutes to build and deploy to your device. Grab yourself a coffee (or a beer).

## 3. Set environment variables 

In the Resin dashboard, set the following environment variables:

* *AUTH* enables HTTP basic auth. This is essential if you're forwarding a public URL to your device.
* *AUTH_USERNAME* Pick a random username for this one.
* *AUTH_PASSWORD* Pick a random password for this one.

Optionally, set the *PRESET_DIR* directory to "/data/presets" if you'd like to have Sonos presets persist through app updates.
(The /data directory on Resin is persistent).

![env_vars.png]({{site.cdn_path}}/2017/05/16/env_vars.png)

## 4. Enable public URL

Enable a public URL to your device by visiting Actions -> Public URL.

![public_url.png]({{site.cdn_path}}/2017/05/16/public_url.png)

## 5. Enjoy!

And you're done! Visit the public URL to see your Sonos API server. The main page should render, but you'll need to
authenticate with the credentials you'd set in the environment variables to hit any other endpoints.

![sonos_api.png]({{site.cdn_path}}/2017/05/16/sonos_api.png)


