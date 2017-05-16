---
layout: post
published: true
title: Using an AWS IoT button to control Sonos speakers
---
This is a placeholder post (will add more later on the implementation) for a recent weekend project. Essentially, this AWS IoT button triggers a Lambda which toggles the play/pause state on my Sonos speakers.

Demo:
{% youtube xUQ8kxjlXlA %}

To control the Sonos speakers, I used a Raspberry Pi running [Sonos HTTP API](https://github.com/davidmerrick/rpi-node-sonos-http-api). I deployed this with [Resin.io](https://resin.io/) so that I could give it a public web address.
