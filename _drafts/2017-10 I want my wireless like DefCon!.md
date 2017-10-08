### Firewall Ports

So the request from the AC endpoint to the radius server is pretty simple; UDP 1812. The question I had was how tight could I do for replies. I don't want to open up all requests from the NAS in the Home Network to everything at the management network, as then my NAS box becomes a fantastic pivot point and kinda blows up my network segmentation.

So I fired up tcpdump and captured the traffic between the access point and the controller.

```
heringbe@Network-Minion:~$ sudo tcpdump host 192.168.1.129
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
13:45:02.118648 IP UnifyACPro.localdomain.39764 > Network-Minion.radius: RADIUS, Access-Request (1), id: 0x84 length: 174
13:45:02.339659 IP Network-Minion.radius > UnifyACPro.localdomain.39764: RADIUS, Access-Challenge (11), id: 0x84 length: 101
13:45:02.342784 IP UnifyACPro.localdomain.39764 > Network-Minion.radius: RADIUS, Access-Request (1), id: 0x85 length: 187
13:45:02.465083 IP Network-Minion.radius > UnifyACPro.localdomain.39764: RADIUS, Access-Challenge (11), id: 0x85 length: 64
13:45:02.471264 IP UnifyACPro.localdomain.39764 > Network-Minion.radius: RADIUS, Access-Request (1), id: 0x86 length: 306
13:45:02.485671 IP Network-Minion.radius > UnifyACPro.localdomain.39764: RADIUS, Access-Challenge (11), id: 0x86 length: 1068
13:45:02.491525 IP UnifyACPro.localdomain.39764 > Network-Minion.radius: RADIUS, Access-Request (1), id: 0x87 length: 185
13:45:02.496052 IP Network-Minion.radius > UnifyACPro.localdomain.39764: RADIUS, Access-Challenge (11), id: 0x87 length: 1039
13:45:02.507648 IP UnifyACPro.localdomain.39764 > Network-Minion.radius: RADIUS, Access-Request (1), id: 0x88 length: 323
13:45:02.517664 IP Network-Minion.radius > UnifyACPro.localdomain.39764: RADIUS, Access-Challenge (11), id: 0x88 length: 123
13:45:02.520122 IP UnifyACPro.localdomain.39764 > Network-Minion.radius: RADIUS, Access-Request (1), id: 0x89 length: 185
13:45:02.524569 IP Network-Minion.radius > UnifyACPro.localdomain.39764: RADIUS, Access-Challenge (11), id: 0x89 length: 101
13:45:02.526630 IP UnifyACPro.localdomain.39764 > Network-Minion.radius: RADIUS, Access-Request (1), id: 0x8a length: 222
13:45:02.535578 IP Network-Minion.radius > UnifyACPro.localdomain.39764: RADIUS, Access-Challenge (11), id: 0x8a length: 133
13:45:02.538061 IP UnifyACPro.localdomain.39764 > Network-Minion.radius: RADIUS, Access-Request (1), id: 0x8b length: 286
13:45:02.548082 IP Network-Minion.radius > UnifyACPro.localdomain.39764: RADIUS, Access-Challenge (11), id: 0x8b length: 149
13:45:02.550393 IP UnifyACPro.localdomain.39764 > Network-Minion.radius: RADIUS, Access-Request (1), id: 0x8c length: 222
13:45:02.560173 IP Network-Minion.radius > UnifyACPro.localdomain.39764: RADIUS, Access-Challenge (11), id: 0x8c length: 101
13:45:02.562258 IP UnifyACPro.localdomain.39764 > Network-Minion.radius: RADIUS, Access-Request (1), id: 0x8d length: 222
13:45:02.684648 IP Network-Minion.radius > UnifyACPro.localdomain.39764: RADIUS, Access-Accept (2), id: 0x8d length: 170
```

I did it a couple of times and always got UDP port 39764 as the port initiating of the Radius request. Fantastic!

But wait, that's not defined. That's just a high random ephemeral port and could totally change and break things. There's got to be a less fragile way!

At this point I realized and confess the great debt that I have to all of the fantastic Network Engineers that I've worked with over the years who I've taken far too much for granted. After burning a weekend slowly poking at Radius I've finally redescovered the basic networking of a ***session management***.

I mean, seriously, I'm a little embarassed how long it took me to realize that my internal VLAN isolation implementation didn't have the same stateful session management implemented of the cheapest home router.