---
layout: post
title: A Basic Unifi Security Setup
---

It was death by papercuts, but my old AirPlay Express router finally bit the dust. With the addition of [Pi-Hole](https://benjamin-hering.com/Pi-hole-saves-my-router/), it was *fine*. Not great, but with 30 minutes of fiddling with it every week and setting it on a timer to reboot regularly it was *marginally acceptable*. With so much of my life and work being tied pretty directly to the internet, I ended up making the same calculations that [Troy Hunt did](https://www.troyhunt.com/ubiquiti-all-the-things-how-i-finally-fixed-my-dodgy-wifi/) that paying for quality networking gear will pay off in the long run, and bit the bullet to buy a full Unifi setup.

And, *oh man* is it fantastic. The first time that sat down and did a speed test I discovered  only to discover that the AirPort Express' ethernet link maxes out at 100 Mbps and there was an entire world worth of burst bandwidth from my ISP I hadn't seen. It was enough to get me hooked.

![Speedtest](https://benjamin-hering.com/images/unifi-setup/unifi-speedtest.png)
*(oh man, I've been missing out on so much internet! And this is just a Wi-Fi speedtest!)*

That said, the Unifi setup is not exactly plug and play. While the defaults are good (and waaaay better than a random D-Link router pulled off the shelf) there was more than a few things that I had to hammer out to get exactly the behavior I was hoping from hit.

## UniFi Setup

For starters, here's my purchase list:

* Unifi Security Gateway
* Unifi 8 Port 60W PoE Switch
* Unifi AP AC Pro

For those familiar with the Unifi system, you might find the UniFi Cloud Controller a noted absence. From what I hear, using the cloud controller to as the central brains to manage everything just makes a smooth process even smoother, but  I had enough other devices that are always on that it would work just fine to piggyback off one of them. 

After plugging everything in I got a basic network connectivity off the wired ports without much hiccup. By default, everything gets a DHCP lease from the Security Gateway from a non-tagged default network in the 192.168.1.0/24 range, giving me enough basic internet to plumb everything else together. First off, I scripted together the install of a Unifi Controller off a basic Raspian Lite install. Fire up a screen session, curl piped to bash and a cup of coffee or two later I have a fully functional Unifi Controller ready to spin up and adopt everything.

### Unifi Controller Setup Setup Script for Raspberry PI
<script src="https://gist.github.com/benjamin-hering/a55817966ef8a6da0ecf7a69155b5806.js"></script>

### Networking Architecture
Next up is adopting all of the devices and starting to throw together a set of internal networks. The basics of a Unifi setup have been [covered well by others](https://www.youtube.com/watch?v=3cdjZIvmLm4), so I'd rather focus on my architectural choices. It's not a perfect setup for all people of all times and places, but I think it's a good default choice for others using a Unifi setup for a bit beefier than normal home network. Here's my layout:

* Default Network - 192.168.1.0/24 This is the default, untagged network that everyone get's dumped into before you do any setup. In an ideal world, I'd love to nothing on this network at all. Unfortunately, while the Unifi Switches have the ability to chose a different VLAN for their management network, attempting to assign static IPs for the Security Gateway or the Switch broke things pretty hard, so they live here by default. My Raspberry Pi Unifi Controller lives here too until everything else can move away.

* Management Network - 192.168.10.0/24 - VLAN 10. Aspirational more than anything, hoping that some future firmware update will let me change the management IP for the security gateway and the access point sometime in the future. Currently, this network has only the switch and whatever computer I'm specifically signing on to make changes to the UniFi setup. With this combined with the top Default Network, anything involved with managing the network is segmented off from general users of the network. Only when I'm plugged into a specific port on the switch can you get an IP to the management or default networks to do any general configuration of the network. 

* Home Network - 10.0.20.0/24 - VLAN 20. Here's the bulk of the things. If the device is here long-term, and gets security updates at least once a quarter it can live here and talk to all the things.

* Guest & IoT Network - 10.0.30.0/24 - VLAN 30. In a perfect world, all manufacturers of shiny toys would invest in regular security updates. [In an imperfect world](https://twitter.com/internetofshit?lang=en), the Unifi Guest Network defaults are pretty good here. Anything hooked up here can get full internet but any lateral movement is entirely shut down. If you want to have a guest network with a shiny goof login page or play with vouchers, you could spring up a 5th IoT network  with the lateral movement shut down from firewall rules on the security gateway, but of for my purposes it worked fine to combine the two.

### Unifi VLAN Isolation
My assumption was that VLANs would start by default with a default deny ACL. While the guest network certainly lived up to my expectations, I was surprised to find the defaults was that I could mess around with everything in the management networks just jacked in to the wireless network tied to the home network (VLAN 20).

I discovered that outside of a few pre-built rules (like dropping anything on the WAN side that wasn't initiated internally, and isolation of the Guest Network), if the Gateway knows how to route across the networks, it will. This was easily enough fixed with a two new Firewall rules.

First, I setup some local groups to define management ip addresses from everything else.

![Management IPs](https://benjamin-hering.com/images/unifi-setup/management-ip-group.png) 

And then setup a local group to define all local ip addresses

![Local IPs](https://benjamin-hering.com/images/unifi-setup/local-ip-group.png) 

With these groups, I can define two simple firewall rules (done on the "LAN IN" interface of the security gateway):
1. Management IPs can talk to other Management IPs, otherwise
2. Local IPs can't talk to other Local IPs.

![Firewall rules](https://benjamin-hering.com/images/unifi-setup/firewall-rules.png) 

And the specifics of the deny that does the heavy lifting of the VLAN isolation.

![VLAN isolation rule](https://benjamin-hering.com/images/unifi-setup/vlan-isolation-1.png) 
![VLAN isolation rule](https://benjamin-hering.com/images/unifi-setup/vlan-isolation-2.png) 

With this, my home network VLAN (or any new network I make) can talk happily among itself, but once it hits the security gateway to get routed to another network it gets stopped. And now I have my VLAN isolation.

Curious side note, when I run an nmap scan from one VLAN to another I do get one reply back. The Unifi Security Gateway has an IP in all of the VLANs as a default gateway, and so will respond to scans from other networks but non-gateway IPs on those networks are still isolated.

### And I still get Pi-Hole DNS
Now with a Raspberry Pi running all the time for a Unifi controller, I wanted to use the same hardware to keep running [Pi-Hole](https://benjamin-hering.com/Pi-hole-saves-my-router/). Ideally, I wanted to keep Pi-Hole DNS without unwinding any part of the firewall rules I had just figured out for VLAN isolation. 

Fortunately, the default behavior of the Unifi Security Gateway is to set itself as the main resolver for all clients and then pass on the DNS requests to the resolvers you specify, and is perfectly happy to have a local DNS resolver. All of the Pi-Hole logs show the requests coming from the security gateway instead of the actual end clients, but I'll take that over having to punch holes in the firewall rules directly and keep the ad-blocking DNS resolution in place.
