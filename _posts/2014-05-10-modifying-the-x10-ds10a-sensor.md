---

published: true
title: Modifying the X10 DS10A sensor
---
Sure, more and more WiFi-connected home automation gadgets are being released on the market. But most of them are prohibitively expensive, and it's still very early in the Internet of Things era. Who knows how the market will shape up in the next decade; New protocols will be developed, better products will be released, prices will drop. Why waste hundreds of dollars speculating on the technology of tomorrow when the technology of yesterday works just as well, and is cheaper?

Enter the DS10A. This is an X10 home security sensor that can be acquired for a mere $4 on eBay. Closing the magnetic switch triggers the sensor to broadcast a long-range signal. It requires two AA batteries and is very low-power so they won't need changing often.

All you need to receive this signal is a W800RF32A antenna. I picked up mine for around $70 two years ago on [this website](http://www.wgldesigns.com/w800.html). It looks like it's discontinued, but I'm sure it would be easy to find on eBay.

The DS10A is a very versatile sensor for hacking. It's literally just two wires that broadcast a signal when connected.

Out of the box, you can easily use it to monitor the state of doors and windows.

If you remove the wires from the magnetic switches, however, the possibilities are endless. I used it to have my doorbell send me a text message when it's rung.

![]({{site.cdn_path}}/2014/05/10/1.jpg)

This works somewhat inconsistently, and I'm sure there's some sort of relay I could use that would be a more elegant solution. Unfortunately, my knowledge of electricity is somewhat lacking, so I'll update this post after I talk to some of my electrical engineering friends or find an alternate solution.

If you're curious, I used an Ubuntu server running heyu to do this. SMS gateways can be expensive, so instead I used a script to post to a private Twitter account I set up and subscribed to by text message in order to "relay" the SMS for free.

I also had an idea to wire the DS10A into a smoke alarm that could send me alerts on my phone if it was triggered. It's no Nest (which you might want to avoid anyway according to Consumer Reports), but it's a hell of a lot cheaper. I haven't gone about doing this yet, but [this guide](http://forums.x10.com/index.php?topic=24104.0) looks promising.
