---
published: true
title: 'State of my smart home, 2023'
---

Several friends have visited my place and asked about my setup, so I thought it would be easiest to 
consolidate that explanation in a blog post. And hopefully it's useful to the wider Internet, as well 🙂.

Here's the current state of my smarthome in 2023, and a few future plans with it.

# The Hub: Home Assistant

The brains of the operation is powered by [Home Assistant](https://www.home-assistant.io/), running on a rack-mounted Raspberry Pi 3.

![]({{site.cdn_path}}/2023/01/11/rack-pi.jpg)

It has a Nortek USB radio which can talk both Zigbee and Z-Wave protocols. It works nicely for Zigbee. Can't comment on Z-Wave because
I don't have any Z-Wave devices, but I like having the flexibility to add them down the line.

I have a subscription to [Nabu Casa](https://www.nabucasa.com/) so I can access my Home Assistant instance remotely and through the iOS app.
It runs $5/month, which is totally reasonable, and it feels good to help fund development. 

## Plugins

Here are a few Home Assistant plugins I've found most useful.

### Backups

The first thing you should do after setting up Home Assistant is to get a backup strategy in place,
for that inevitable moment when you bork your configuration file.

I found the [Google Drive backup plugin](https://github.com/sabeechen/hassio-google-drive-backup) to be really easy to set up. 
I configured it to back up nightly and keep the last 10 backups in Google Drive, just to give me a buffer
if I need to roll back.

### TailScale

[TailScale](https://tailscale.com) is this really useful zero-configuration VPN with native apps for 
most platforms. I use it for remote access if I need to SSH into the Pi. Use [this plugin](https://www.home-assistant.io/integrations/tailscale/)
to add it to your Home Assistant setup.

# Control

## Voice

I use Google Home for voice control. It works well enough for turning lights on and off and getting the weather. The Home
Assistant community [has been building local voice control](https://www.home-assistant.io/blog/2022/12/20/year-of-voice/) 
and has a goal for 2023 to enable that, which I'm excited about.

## Local

I have Kindle Fire tablets around the house that surface Home Assistant dashboards for local control.
I chose Kindles because Amazon practically gives them away when they're on sale, and you can run an app called [Fully Kiosk](https://www.fully-kiosk.com/en/) 
for that kiosk functionality. I set mine up so that the screens are usually off, but turn on when the camera detects motion.

For mounting them, I found a seller on Etsy who 3d prints cases. Those run about $50 each, which is almost what I paid for the tablets. 
If you have your own 3d printer, it's likely much cheaper to make your own. I just don't have one of those yet, 
so I didn't mind shelling out.

![]({{site.cdn_path}}/2023/01/11/kindle-kiosk.jpg)

# Lights

Most of my smart lights are Phillips Hue. They're expensive, but they're the most reliable ones on the market,
they integrate easily with Home Assistant, they look great, and the Hue app is very intuitive to use. 
The best deal is to buy the bundles when those go on sale.

For light switches, I have a mix of Lutron Auroras, Hue remotes, and the newer Tap Dial switches.

The Lutron Auroras have been excellent for battery life and easy dimming, 
but right now I'd recommend the Tap Dial switches if you can find them; they just came out late last year 
and make it easy to select scenes. They're also about the same price as the Auroras.

For my non-Hue lights, I have a few of TP-Link's Kasa switches, and have been happy with those. 

# Sensors

> One accurate measurement is worth a thousand expert opinions.
> 
> -- Grace Hopper

I have just over a dozen Zigbee sensors, mostly from Aqara. I picked this brand just because it seemed to have the 
most positive reviews on Amazon. I've been pretty happy with them overall. I do wish there were more options out there 
with wall power; it's annoying having to change sensor batteries occasionally. I'm hoping someday in the 
not-too-distant future we'll have more options for wireless power and that won't be a thing anymore but it is for now.

# Presence

I'm most proud of the presence-based automations I've built.

In each room with motion automations, I drive them with two sensors:
* Hue Motion Sensor
* Aqara FP1

The Aqara FP1 is a millimeter-wave sensor that just came out late last year. Millimeter-wave is essentially radar that 
can pick up subtle presence cues, such as a person in a room breathing. At the time of this writing, you can't buy these 
sensors in the US yet, but I found a supplier on [Aliexpress](https://www.aliexpress.us). Not because the sensors are illegal or anything, 
just supply-chain shenanigans, I assume. It was the Chinese version of the product, but it works fine with Home Assistant.

The FP1 really shines when it comes to detecting when someone is *not* in a room. You know that thing with infrared 
motion sensors in offices or public bathrooms sometimes where they turn the lights off even when you're still in there? Not a problem 
with millimeter-wave tech. If you're in a room and not moving, it'll usually pick you up.

The problem with them is that they're laggy to initially detect presence. It takes a few seconds for them to register. That's why
I pair them with passive infrared motion sensors, which pick up motion right away. In Home Assistant, you can group sensors together,
so I always group the FP1 and the passive infrared sensors. 

The logic works like this: If either sensor detects presence, the sensor group flips to "on." 
It only flips to "off" if neither sensor detects presence anymore. This grouping works great; I have yet to run into 
any false positives or negatives with it.

There's even a home automation YouTuber who built his own sensor called [Everything Presence One](https://shop.everythingsmart.io/en-us/products/everything-presence-one-kit) 
which combines these two technologies for this reason.

# Future Plans

## Circadian lighting

I'd like it if lights in certain rooms shifted to the red end of the spectrum
as the sun set. It's a more natural feel to the lighting, and would make it 
easier to wind down at the end of the day. There is a Home Assistant
[circadian lighting](https://github.com/claytonjn/hass-circadian_lighting) component you can install
via [HACS](https://hacs.xyz/) which enables this, and [this blog post by 
Tyler Cipriani](https://tylercipriani.com/blog/2022/10/17/whole-house-circadian-lighting-with-home-assistant/) is a great
explanation of it.

## Voice control

As mentioned earlier, I'm looking forward to the voice control Home Assistant is rolling out this year. 

## Node-RED

[Node-RED](https://nodered.org/) is a visual programming tool reminiscent of [Yahoo Pipes](https://www.davidmerrick.me/2010/06/19/remixing-the-web-part-2-using-yahoo-pipes/) (RIP Yahoo Pipes 🪦). 
I tried installing it on the Pi I use for Home Assistant, but it keeps crashing. I'd like to transition off the Pi to a more powerful computer (thinking something Intel NUC-based) and migrate my automations to Node-RED. 

## Security System

I'd like to eventually have a security system. I might just go for something turnkey, like Ring or SimplySafe. But I should mention that Home Assistant does have some security functionality.

## Frigate

[Frigate](https://frigate.video/) looks really slick. It's local NVR that you can run on [Google Coral TPUs](https://coral.ai/) with custom models for object detection. I like this idea of edge computing and I've thought about taking that for a spin. You could create some pretty interesting automations off of object detections, I'd imagine.
