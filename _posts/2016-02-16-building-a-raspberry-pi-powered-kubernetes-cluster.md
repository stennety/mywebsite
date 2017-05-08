---
layout: post
published: true
title: Building a Raspberry Pi-Powered Kubernetes Cluster
---
Kubernetes was being used more and more at my office, so I wanted to dive in myself and figure out how this thing worked. 
I'd seen a few posts about building a cluster out of Raspberry Pis online, and decided to try it myself. 
I picked up 5 Pis, rack-mounted them on a set of tiny Pi racks I found on Amazon, hooked them up to a switch, 
and got [HypriotOS](https://blog.hypriot.com/) running on them. 
Soon after, I was able to deploy Docker containers to the cluster.

![]({{site.cdn_path}}/2016/02/16/pi_kube.jpg)

Supplies used:
* [5x Raspberry Pi](https://www.amazon.com/Raspberry-Model-A1-2GHz-64-bit-quad-core/dp/B01CD5VC92/ref=sr_1_3?s=pc&ie=UTF8&qid=1494283955&sr=1-3&keywords=raspberry+pi)
* [5-pack of micro-USB cables](https://www.amazon.com/Sabrent-6-Pack-Premium-Cables-CB-UM61/dp/B011KMSNXM/ref=sr_1_5?s=electronics&ie=UTF8&qid=1494284260&sr=1-5&keywords=raspberry+pi+rack)
* [2x stackable Pi racks](https://www.amazon.com/GeauxRobot-Raspberry-2-layer-Stack-Enclosure/dp/B00NU70MZS/ref=sr_1_3?s=electronics&ie=UTF8&qid=1494284260&sr=1-3&keywords=raspberry+pi+rack)
* [Anker 5-port USB charger](https://www.amazon.com/Anker-Charger-PowerPort-Multi-Port-Samsung/dp/B00VH8ZW02/ref=sr_1_2?ie=UTF8&qid=1494284393&sr=8-2-spons&keywords=anker+usb+charger&psc=1)
* [8-port gigabit switch](https://www.amazon.com/gp/product/B00A121WN6/ref=oh_aui_search_detailpage?ie=UTF8&psc=1)
* [5-pack of short, color-coded CAT5e patch cables](https://www.amazon.com/dp/B00E5I7T9I/ref=twister_B01I9FT7XI?_encoding=UTF8&psc=1)
