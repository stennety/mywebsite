---
layout: post
title: Update - Pi hole saves my router
---

Pi-hole is great! The Airport Express it's been saving, not so much. Things have been going swimmingly right up until we had our first overnight guest. I, like most modern hosts, recognize that wi-fi has dropped itself into the base of the modern Maslow's hierarchy of needs and in being hospitable to our guests generally want to provide that. Airport Express has a great checkboxy "create a guest network" feature, save that *you can't specify different DNS servers for the guest network.*

So, this basically bifurcated my network into a super great main wifi network for myself, and a completely busted network for guests. Things connected would try to hit the Pi-hole on the main network, but as the guest network is VLANed of into isolation, it would result in a fuzzy timeout of DNS resolution. Worst case senario. If it at least failed hard, the queries would drop to the backup external DNS server I have in the config but as it stands it basically cripples the guest network to being completely broken.

My resolution? Take my tiny $10 travel router and set it up to be my dedicated guest network, to give it a dedicated DHCP server to hand out IP addresses and non pi-hole DNS servers. Now that I've taken my single wifi router and now broke it out to 3 different boxes it's looking like it might just be time to let the old router die.
