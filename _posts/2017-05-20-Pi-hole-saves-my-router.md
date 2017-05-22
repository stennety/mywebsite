---
layout: post
title: Pi hole saves my router
---

When spinning up my home network I went the route of overpaying for an Apple Airport Express. I spend a lot of time fighting with technology at work, I'm happy to overpay for the hardware in order to get the legendary Apple "It just works." peace of mind back at home. Which was great! Until it wasn't.

Recently, I've started noticing *strangeness* in my little Apple router. For a while, I was noticing that it the internet was slow and occasionally failing DNS lookups only to find that my tiny fire and forget Apple router was setting itself as my clients main DNS server. Or sometimes even though I had followed [Taylor Swifts's](https://twitter.com/swiftonsecurity) guide on [best practice for setting up a home router](https://decentsecurity.com/#/routerwifi-configuration/) for multiple redundant DNS entries, only one of my two DNS entries seemed to be making it all the way back to the end clients in the DHCP leases. After smacking my head against the super simple Airport Utility config options, I figured that debugging the inner workings of Apple hardware felt like work, and playing around with the shiny toys of my Raspberry Pis didn't so time to explore pi-hole. 

[Pi-hole](https://pi-hole.net/#) is pretty simple. The idea is that you give them a standard [Raspberry Pi](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) - a $35 basic computer in a box - and they'll have a standard install script that allows a one touch setup of a DNS server. Not just any DNS server, though. In addition to raw resolution of names, it'll also black hole any domain names associated with ads. Effectively it's an ad-blocker on every device I have connected to my network, with a touch of customization to blackhole any custom domain that I'd want or take over DHCP from my overwhelmed Airport Express as well.

It took 5 minutes to setup, already blocked 6% of DNS queries and I haven't noticed any negative downsides of sites failing to load due to mischaracterization of the domain names. In short, it's a win.
