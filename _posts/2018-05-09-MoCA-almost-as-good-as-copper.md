---
layout: post
title: MoCA - Almost as good as copper wires
---

So after slamming in the [UniFi WiFi system](https://blog.benjamin-hering.com/A-Basic-Unifi-Security-Setup/), I had rock solid internet *almost* everywhere in my house, except the desk where I actually work from home. That one corner - the one place where I actually do work people sometimes pay me for - had WiFi speeds 90% slower than everywhere else. And as [The Oatmeal](http://theoatmeal.com/comics/no_internet) points out, the only thing worst than no internet is slow internet. This obviously could not stand.

My wife (who is generally speaking, wiser, kinder and an all around better person than I am) convinced me that drilling an insanely large numbers of exploratory holes around the house for the mere possibility of running a single Cat 6 cable was probably not the best course of action, so I explored less destructive alternatives.

## The Options

My first thought was to grab [UniFi's Mesh Router](https://unifi-mesh.ubnt.com/#products). I decided to leave that as a last resort. Chaining together a bunch of WiFi radios together is not the first choice for low latency connections. And while Ubiquiti advertises it as "Gigabit" they get that number by summing the maximum physically possible bandwidth of both 2.4 GHz and 5 GHz radios together. With no one device (at least that I own) would be spanning across both frequency spectrums at the same time and wanting to stay as close to gigabit line speeds as I could adding mesh routers wasn't particularly appealing.

The next attempt was using [powerline adapters](https://www.tp-link.com/us/products/details/cat-5509_TL-PA7010-KIT.html). These take the existing AC power wiring that's already run throughout your house and add a data signal on top. While they worked fine for me if both adapters were on the same power circuit, jumping the signal through the circuitbreaker box dropped the bandwidth significantly. In my case, I was getting 2% of the promised "gigabit" bandwidth and they were actually slower than the wifi issue I was trying to fix.

The last option I saw was to try to use Multimedia over Coaxial or MoCA. This is a standard developed back in 2004 for using bandwidth sections not used by cable TV or DOCSIS (how cable internet gets to you over coax) on a coax cable for short-run network connections. In general, those other items are sending things from 45 Mhz to 1000 Mhz, and MoCA will happily transmit in the 1000 to 1500 Mhz frequency range. My (incredibly basic) understanding of coax attenuation is that the higher the frequency the higher the attenuation (amount of signal loss per foot of cable). Thus the higher MoCA frequency range is mostly worthless to the cable company who has to worry about coaxial cable runs measured in miles, but is just fine for connections inside of a single house measured in a few hundred feet.

As standards improved and bandwidth needs increased, there's started to be some conflict between the two in frequency spectrums in the latest DOCSIS 3.1 and MoCA 2.5 standards, but that's something smart electrical engineers can fight with. With my area currently only DOCSIS 3.0 and MoCA 2.0 advertising up to the gigabit speed I'm hoping for, I'm don't have to worry about those details quite yet.

MoCA first saw use as a way for devices already connected via coax to share information with each other (DVRs or TiVO boxes streaming a show recorded on one box to another for example) but with a few adapters you can use the same standard to basically run the equivalent of an ethernet cable over whatever coax cable lines are already in place for cable TV. Actiontec seems to make what was the industry standard MoCA adapters for a long while, but I ended up going with a pair of [Motorola MM1000s](https://motorolanetwork.com/mm1000.html) a newer entry to the market because they supported at least some encryption between the two adapters and were about a third less expensive.

![2 boxes of Motorola MM1000 MoCA adapters](https://blog.benjamin-hering.com/images/moca/mm1000-boxes.jpg) 

## Getting a Baseline

As my connection out to the internet is not near gigabit speeds, I needed something internally to do bandwidth tests across my network to actually evaluate how close my new MoCA adapters were getting to actual gigabit speed. I used [iperf3](https://iperf.fr/iperf-download.php) as a systems agnostic internal bandwidth test. The most basic of tests are simple. One computer needs to act as the server, which is done by running iperf3 with the -s flag

`./iperf3 -s`

While a client computer initiates the test by the -c flag and pointing to the hostname or IP address of the server computer

`./iperf3 -c <server ip>`

There's more flags with more options to fiddle with the defaults, but the commands above are sufficient for a simple speedtest. To get a baseline, I started with just seeing what my network's normal behavior is with just ethernet cables. For context, my baseline hardware for these tests are:

* A Unifi US-8-60W gigabit switch
* Two Macs with Thunderbolt gigabit ethernet adapters
* Cat 5E or Cat 6 cable for all the interconnects. (Both Cat 5E and Cat6 standards are rated for gigabit ethernet for the short cable runs I'm dealing with)

Here's the raw baseline before doing anything with the MoCA adapters, just simple Cat 5E cables running throught the gigabit switch.

	$ ./iperf3 -c 10.0.20.65
	Connecting to host 10.0.20.65, port 5201
	[  4] local 10.0.20.75 port 51410 connected to 10.0.20.65 port 5201
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-1.00   sec   112 MBytes   942 Mbits/sec
	[  4]   1.00-2.00   sec   112 MBytes   940 Mbits/sec
	[  4]   2.00-3.00   sec   112 MBytes   940 Mbits/sec
	[  4]   3.00-4.00   sec   112 MBytes   941 Mbits/sec
	[  4]   4.00-5.00   sec   112 MBytes   940 Mbits/sec
	[  4]   5.00-6.00   sec   112 MBytes   940 Mbits/sec
	[  4]   6.00-7.00   sec   112 MBytes   940 Mbits/sec
	[  4]   7.00-8.00   sec   112 MBytes   940 Mbits/sec
	[  4]   8.00-9.00   sec   112 MBytes   940 Mbits/sec
	[  4]   9.00-10.00  sec   112 MBytes   940 Mbits/sec
    - - - - - - - - - - - - - - - - - - - - - - - - -
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-10.00  sec  1.09 GBytes   940 Mbits/sec                  sender
	[  4]   0.00-10.00  sec  1.09 GBytes   940 Mbits/sec                  receiver
	iperf Done.

So that's 10 seconds, hitting a pretty consistent ~940 Mbits/sec. It's not at exactly 1000 Mbits/sec, but for the purposes of my home network I'll call that full "gigabit" bandwidth. If my MoCA adapters can similarly hit ~940 Mbits/sec I'll give them full marks. At the least, they wouldn't be the slowest link in my network.

## Initial Benchmarking

For my first test, I wanted to get the cleanest reading of the maximum bandwidth of these devices with the smallest amount of confounding variables as possible, so I just connected the two devices directly to each other with the coax cable that came in the box with them.

![2 Motorola MM1000 MoCA adapters connected directly together](https://blog.benjamin-hering.com/images/moca/initial-mm1000-test.jpg) 

The results were not as good as I had hoped:

	$ ./iperf3 -c 10.0.20.65
	Connecting to host 10.0.20.65, port 5201
	[  4] local 10.0.20.75 port 51784 connected to 10.0.20.65 port 5201
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-1.00   sec   103 MBytes   865 Mbits/sec
	[  4]   1.00-2.00   sec   110 MBytes   923 Mbits/sec
	[  4]   2.00-3.00   sec  99.1 MBytes   831 Mbits/sec
	[  4]   3.00-4.00   sec   106 MBytes   890 Mbits/sec
	[  4]   4.00-5.00   sec   111 MBytes   931 Mbits/sec
	[  4]   5.00-6.00   sec  96.8 MBytes   812 Mbits/sec
	[  4]   6.00-7.01   sec  28.7 MBytes   239 Mbits/sec
	[  4]   7.01-8.00   sec  6.57 MBytes  55.4 Mbits/sec
	[  4]   8.00-9.00   sec  42.8 MBytes   359 Mbits/sec
	[  4]   9.00-10.01  sec  19.2 MBytes   160 Mbits/sec
	- - - - - - - - - - - - - - - - - - - - - - - - -
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-10.01  sec   723 MBytes   606 Mbits/sec                  sender
	[  4]   0.00-10.01  sec   723 MBytes   606 Mbits/sec                  receiver

Overall, it seems to be able to burst to near gigabit speeds, but there's a lot of variability. Just to be sure, I ran the test a few more times and got a slightly better overall picture, but still a lot of variability second to second:

	- - - - - - - - - - - - - - - - - - - - - - - - -
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-10.00  sec  1.03 GBytes   884 Mbits/sec                  sender
	[  4]   0.00-10.00  sec  1.03 GBytes   884 Mbits/sec                  receiver
	
	- - - - - - - - - - - - - - - - - - - - - - - - -
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-10.00  sec  1.03 GBytes   883 Mbits/sec                  sender
	[  4]   0.00-10.00  sec  1.03 GBytes   883 Mbits/sec                  receiver
	
Still, even at the worst test it was beating my current wifi speed in the crappy corner by a factor of 10, so even if I wasn't getting the full speeds listed on the box, it was still an improvement.

## So let's make it (more) secure

So bonus points to Motorola, they have [an entire page](http://www.motorolacable.com/mocasecurity/) dedicated to speaking about the security best practices for this device in a way that an average consumer can understand.

And then minus points that it doesn't work over HTTPS.

![HTTPS error on motorola cable security page](https://blog.benjamin-hering.com/images/moca/motorola-security-no-https.png)

And the whois information for the domain doesn't really tie back directly to Motorola, and clicking the 'home' logo for the page takes you to a completely different with a different DNS nameservers, and boy would it be easy to register motorolacable.net and make sweet authentic looking phishing page to host infected firmware updates for these things given that there's no real way to verify that the motorolacable.com site is *actually* run by Motorola.

Regardless, www.motorolacable.com is *probably* the right domain for this, if only because the links in the paper quickstart guide they ship with this device all get redirected back to this domain. In any case, they have 2 suggestions for increasing the security of your MoCA device.

1. Install a Point-of-Entry (POE) filter on your device where your coax cable first comes into your house.
2. Set an encryption key on all of your MoCA devices.

Like any good security focused tinkerer, when offered an either/or choice between two different security controls, my answer is "why not both?"

## Let's start with encryption.

So on the security page, they outline that you need to be running the 1.0.0.8 version of the firmware or later. Out of the box, mine are only running 1.0.0.6.

![Config page showing the devices running 1.0.0.6](https://blog.benjamin-hering.com/images/moca/mm1000-setup-page.png)

Latest version of firmware is downloadable [http://www.motorolacable.com/support/MM1000/firmware/](http://www.motorolacable.com/support/MM1000/firmware/). Again the site is HTTP only, and there's no checksums to validate, so your options to validate that the firmware is correct and hasn't been tampered in transport is mostly just thinking happy, optimistic thoughts.

To access the admin page for the MoCA adapter, connect your laptop to the ethernet port on it and manually set your IP to something in 192.168.0.0/24 range (Motorola recommends .5) and hit the admin page straight at 192.168.0.2.

![Static IP](https://blog.benjamin-hering.com/images/moca/manual-static-address.png)

That's it. There's no password, _no security protections at all_ to protect the administration of these MoCA adapters. If someone can connect to a network one either end of these devices and set their IP to something routable to 192.168.0.2 they have full admin rights to the box. Executing a denial of service attack against these is **trivial.** Turning off or not encryption on a single, or setting the encryption key for one adapter to different than the rest and you can completely break the connection. An attacker can even update the firmware if they're smart enough to roll their own malicious firmware update, or simply brick the device with a garbage update. It's rarely a good idea to have your management or admin pages for devices accessible on the public internet, but doubly so when full admin rights have zero authentication. **It's a really bad idea to connect these adapters directly to the public internet.**

So I snagged the update, went to the "SW Update" link on the most basic HTTP admin page I have evern seen, and hit go.

![Static IP settings](https://blog.benjamin-hering.com/images/moca/mm1000-software-update.png)

After restarting the router I was updating, I saw it come up registering the .8 firmware and moved over to the second router. Once I loaded up the admin page for the second, I was pleasently surprised to see it showing that the secondary too had also updated to the latest firmware! Was there an auto-sync in place to push out to all linked MoCA adapters the latest update across the coax cable?

No, it was just terrible browser cache settings for the admin page. Reloading it in incognito mode showed that the second adapter still had the same old firmware.

![admin page in incognito shows the correct firmware version](https://blog.benjamin-hering.com/images/moca/mm1000-incognito-for-version.png)

Only after updating the second one and getting ready to do an updated bandwidth test did I find the essential last step outlined in a firmware update off the Motorola download page:

> Important! You must perform a factory reset on the MM1000. Using a pin or straightened paperclip, press and hold the RESET button for three (3) seconds. Please wait 45 seconds while the MM1000 restores its factory default settings.

That could have been perhaps added to instructions in the admin page, but whatever, we're on the latest firmware now. Let's test it again and see if they snuck any speed improvements in with the encryption settings.

## Benchmarking the 1.0.0.8 Firmware

First tests looked much better! The best test I had seen yet!

	$ ./iperf3 -c 10.0.20.65
	Connecting to host 10.0.20.65, port 5201
	[  4] local 10.0.20.75 port 55018 connected to 10.0.20.65 port 5201
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-1.00   sec   108 MBytes   904 Mbits/sec
	[  4]   1.00-2.00   sec   112 MBytes   941 Mbits/sec
	[  4]   2.00-3.00   sec   112 MBytes   940 Mbits/sec
	[  4]   3.00-4.00   sec   112 MBytes   938 Mbits/sec
	[  4]   4.00-5.00   sec   112 MBytes   940 Mbits/sec
	[  4]   5.00-6.00   sec   112 MBytes   940 Mbits/sec
	[  4]   6.00-7.00   sec   112 MBytes   940 Mbits/sec
	[  4]   7.00-8.00   sec   112 MBytes   940 Mbits/sec
	[  4]   8.00-9.00   sec   112 MBytes   940 Mbits/sec
	[  4]   9.00-10.00  sec   107 MBytes   898 Mbits/sec
	- - - - - - - - - - - - - - - - - - - - - - - - -
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-10.00  sec  1.09 GBytes   932 Mbits/sec                  sender
	[  4]   0.00-10.00  sec  1.08 GBytes   932 Mbits/sec                  receiver
	iperf Done.

So I ran the test again, just to be sure... And it was the worst I'd seen yet

	$ ./iperf3 -c 10.0.20.65
	Connecting to host 10.0.20.65, port 5201
	[  4] local 10.0.20.75 port 55034 connected to 10.0.20.65 port 5201
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-1.00   sec   850 KBytes  6.96 Mbits/sec
	[  4]   1.00-2.00   sec  2.18 MBytes  18.3 Mbits/sec
	[  4]   2.00-3.00   sec  2.18 MBytes  18.3 Mbits/sec
	[  4]   3.00-4.00   sec  3.02 MBytes  25.3 Mbits/sec
	[  4]   4.00-5.00   sec  5.71 MBytes  47.9 Mbits/sec
	[  4]   5.00-6.00   sec  10.1 MBytes  84.8 Mbits/sec
	[  4]   6.00-7.00   sec  15.9 MBytes   133 Mbits/sec
	[  4]   7.00-8.00   sec  29.2 MBytes   245 Mbits/sec
	[  4]   8.00-9.00   sec  58.5 MBytes   491 Mbits/sec
	[  4]   9.00-10.00  sec  91.0 MBytes   764 Mbits/sec
	- - - - - - - - - - - - - - - - - - - - - - - - -
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-10.00  sec   219 MBytes   183 Mbits/sec                  sender
	[  4]   0.00-10.00  sec   218 MBytes   183 Mbits/sec                  receiver
	
	iperf Done.
	
Subsequent retests showed the same wide swings of second to second variability (Anywhere from 939 to 10.1 Mbits/sec), but settling in to a little worse than the previous firmware version.
	
	- - - - - - - - - - - - - - - - - - - - - - - - -
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-10.01  sec   634 MBytes   532 Mbits/sec                  sender
	[  4]   0.00-10.01  sec   634 MBytes   532 Mbits/sec                  receiver
	
	- - - - - - - - - - - - - - - - - - - - - - - - -
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-10.00  sec   775 MBytes   650 Mbits/sec                  sender
	[  4]   0.00-10.00  sec   775 MBytes   650 Mbits/sec                  receiver

## Turning on encryption

If you're on the 1.0.0.8 firmware version, adding encryption is pretty simple. In fact, the "Security" tab is the new landing page of the admin interface. 

1. Set encryption to "on" 
2. Drop in a 12 to 17 character encryption key. **Numbers only!**
3. Hit save and reboot the adapter. 
4. Rinse and repeat for any other adapters and give them all the same key.

![setting the encryption key](https://blog.benjamin-hering.com/images/moca/mm1000-reboot-encryption.png)

## Does encryption slow things down?

I'd initially thought it would slow down. If these tiny devices are CPU bound I'd expect the work to encrypt and decrypt could hit some resource constraints but with all the variability it's hard to tell. I ran a couple of tests back to back to check:

	- - - - - - - - - - - - - - - - - - - - - - - - -
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-10.00  sec   654 MBytes   549 Mbits/sec                  sender
	[  4]   0.00-10.00  sec   654 MBytes   549 Mbits/sec                  receiver
	
	- - - - - - - - - - - - - - - - - - - - - - - - -
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-10.00  sec   647 MBytes   543 Mbits/sec                  sender
	[  4]   0.00-10.00  sec   647 MBytes   543 Mbits/sec                  receiver
	
	- - - - - - - - - - - - - - - - - - - - - - - - -
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-10.00  sec  1002 MBytes   840 Mbits/sec                  sender
	[  4]   0.00-10.00  sec  1002 MBytes   840 Mbits/sec                  receiver

Still a wide variance, but all still in the range of previous tests. 

## Is this encryption any good?

It's better than absolutely nothing, but not by a whole lot. Don't bet your life on it. I'm sure that setting the encryption key to be numbers only was a performance tradeoff somewhere in the engineering, but it dramatically lowers the size of the possible character set. An average desktop computer can brute force a 16 number password in about 3 hours. A 17 number password might take around 3 weeks. If your attacker has even minimal experience brute forcing encryption and a tiny bit of patience, it's a matter of **when** not **if** your encryption would be broken. 

As a general rule, anything important or valuable you do over your MoCA adapters or any other network should have it's own strong protocol level encryption regardless; use HTTPS for web traffic, SSH for command line integration, enable TLS for SMTP traffic and so forth. When your super-weak MoCA encryption is brute-forced, they decrypt to data that's has another level of encryption.

## Actually installing the adapters

Theorectical best possible bandwidth is fascinating and all, but the actual test of performance is whether or not these devices can deliver that bandwidth to my wifi starved corner of the house. I dropped the MoCA adapters in line with my cable modem and at the termination of coax on the other side of the house and re-ran the 10 second default tests.

	- - - - - - - - - - - - - - - - - - - - - - - - -
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-10.00  sec   418 MBytes   351 Mbits/sec                  sender
	[  4]   0.00-10.00  sec   418 MBytes   350 Mbits/sec                  receiver
	
	- - - - - - - - - - - - - - - - - - - - - - - - -
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-10.00  sec   949 MBytes   796 Mbits/sec                  sender
	[  4]   0.00-10.00  sec   948 MBytes   795 Mbits/sec                  receiver
	
	- - - - - - - - - - - - - - - - - - - - - - - - -
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-10.00  sec   924 MBytes   775 Mbits/sec                  sender
	[  4]   0.00-10.00  sec   924 MBytes   775 Mbits/sec                  receiver

At this point, I realized that with the second to second variability being so large, I really needed a longer time window to see whether or not any of the changes I'm making in the real-world installation were impactful. Having the test report on the per-minute average instead of the per-second average and moving from a 10 second to 15 or 30 minute test window showed a much more consistent picture of the MoCA performance.

	$ ./iperf3 -c 10.0.20.65 -i 60 -t 1800
	Connecting to host 10.0.20.65, port 5201
	[  4] local 10.0.20.75 port 49630 connected to 10.0.20.65 port 5201
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-60.00  sec  4.85 GBytes   694 Mbits/sec
	[  4]  60.00-120.00 sec  4.83 GBytes   691 Mbits/sec
	[  4] 120.00-180.00 sec  4.85 GBytes   694 Mbits/sec
	[  4] 180.00-240.00 sec  4.86 GBytes   696 Mbits/sec
	[  4] 240.00-300.00 sec  4.87 GBytes   698 Mbits/sec
	[  4] 300.00-360.00 sec  4.86 GBytes   696 Mbits/sec
	[  4] 360.00-420.00 sec  4.87 GBytes   697 Mbits/sec
	[  4] 420.00-480.00 sec  4.86 GBytes   696 Mbits/sec
	[  4] 480.00-540.00 sec  4.87 GBytes   697 Mbits/sec
	[  4] 540.00-600.00 sec  4.87 GBytes   697 Mbits/sec
	[  4] 600.00-660.00 sec  4.84 GBytes   693 Mbits/sec
	[  4] 660.00-720.00 sec  4.85 GBytes   695 Mbits/sec
	[  4] 720.00-780.00 sec  4.84 GBytes   693 Mbits/sec
	[  4] 780.00-840.00 sec  4.84 GBytes   693 Mbits/sec
	[  4] 840.00-900.00 sec  4.83 GBytes   692 Mbits/sec
	[  4] 900.00-960.00 sec  4.84 GBytes   693 Mbits/sec
	[  4] 960.00-1020.00 sec  4.85 GBytes   694 Mbits/sec
	[  4] 1020.00-1080.00 sec  4.85 GBytes   695 Mbits/sec
	[  4] 1080.00-1140.00 sec  4.84 GBytes   694 Mbits/sec
	[  4] 1140.00-1200.00 sec  4.83 GBytes   691 Mbits/sec
	[  4] 1200.00-1260.00 sec  4.84 GBytes   693 Mbits/sec
	[  4] 1260.00-1320.00 sec  4.81 GBytes   689 Mbits/sec
	[  4] 1320.00-1380.00 sec  4.79 GBytes   686 Mbits/sec
	[  4] 1380.00-1440.00 sec  4.82 GBytes   691 Mbits/sec
	[  4] 1440.00-1500.00 sec  4.82 GBytes   691 Mbits/sec
	[  4] 1500.00-1560.00 sec  4.84 GBytes   693 Mbits/sec
	[  4] 1560.00-1620.00 sec  4.82 GBytes   690 Mbits/sec
	[  4] 1620.00-1680.00 sec  4.79 GBytes   686 Mbits/sec
	[  4] 1680.00-1740.00 sec  4.80 GBytes   687 Mbits/sec
	[  4] 1740.00-1800.00 sec  4.85 GBytes   695 Mbits/sec
	- - - - - - - - - - - - - - - - - - - - - - - - -
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-1800.00 sec   145 GBytes   693 Mbits/sec                  sender
	[  4]   0.00-1800.00 sec   145 GBytes   693 Mbits/sec                  receiver

So, at this point it's a running around 690 Mbits/sec, or around 73% of my full 'gigabit' speed, plus the we can reasonably assume that the second to second volatility that was making the earlier tests hard to judge is probably adding some jitter.

## Why not both security controls?

So I added encryption, but realized that it's a pretty weak control. The primary option Motorola recommended was adding the POE filter so that your MoCA can't actually run outside of the coax installed inside your home. I ended up choosing [this one](https://smile.amazon.com/gp/product/B01M4ODQTS) myself, and installed it on the input of the first splitter into my coax network. 

If you have neighbors within 150 yards of you, you should install a POE filter so no one can read the MoCA transmissions on your network. You should also install it to make sure that your MoCA broadcasts don't interfere with other people's coax connected devices. But if neither of those reasons are compelling to you, you should install the POE filter because it can make your MoCA network faster. 

Here's my minute-aggregated bandwidth test after installing the POE filter.

	$ ./iperf3 -c 10.0.20.65 -i 60 -t 900
	Connecting to host 10.0.20.65, port 5201
	[  4] local 10.0.20.75 port 50016 connected to 10.0.20.65 port 5201
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-60.00  sec  6.01 GBytes   861 Mbits/sec
	[  4]  60.00-120.00 sec  6.14 GBytes   880 Mbits/sec
	[  4] 120.00-180.00 sec  6.13 GBytes   878 Mbits/sec
	[  4] 180.00-240.00 sec  6.10 GBytes   874 Mbits/sec
	[  4] 240.00-300.00 sec  6.30 GBytes   902 Mbits/sec
	[  4] 300.00-360.00 sec  6.39 GBytes   914 Mbits/sec
	[  4] 360.00-420.00 sec  6.25 GBytes   895 Mbits/sec
	[  4] 420.00-480.00 sec  6.46 GBytes   925 Mbits/sec
	[  4] 480.00-540.00 sec  6.24 GBytes   893 Mbits/sec
	[  4] 540.00-600.00 sec  6.40 GBytes   917 Mbits/sec
	[  4] 600.00-660.00 sec  6.27 GBytes   898 Mbits/sec
	[  4] 660.00-720.00 sec  6.39 GBytes   914 Mbits/sec
	[  4] 720.00-780.00 sec  6.19 GBytes   886 Mbits/sec
	[  4] 780.00-840.00 sec  6.32 GBytes   905 Mbits/sec
	[  4] 840.00-900.00 sec  6.18 GBytes   884 Mbits/sec
	- - - - - - - - - - - - - - - - - - - - - - - - -
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-900.00 sec  93.8 GBytes   895 Mbits/sec                  sender
	[  4]   0.00-900.00 sec  93.8 GBytes   895 Mbits/sec                  receiver
	
	iperf Done.

We jumped from 693 to 895 Mbits/sec, getting me now around 95% of what my network maximum. An obvious question is to ask why? If my two MoCA devices are sitting on opposite **output** ends of my splitter, why would adding a POE filter on the **input** end of my splitter have any impact? The short answer is I have no idea, I'm a mere amateur in MoCA & coax network particulars. I think it's likely that other people nearby to me are also using MoCA devices and their transmissions were bleeding into my house's coax. Because MoCA devices operate at frequencies with higher attenuation than the DOCSIS or cable TV frequencies, a MoCA devices can compensate by sending a much stronger signal. It's not straightforward for me to analyize my neighborhood coax network, but I'll take the speed increase regardless. 

## What about the splitter itself?

So I knew that MoCA operates primarily at frequencies above 1000 MHz, so I took a quick look at my old, inherited splitter installed God-knows how long ago. It's got more output taps than I need, and the frequency range it's rated for only goes up to 1002 Mhz.

![pre-existing coax splitter rated only up to 1000 Mhz ](https://blog.benjamin-hering.com/images/moca/old-coax-splitter.jpg)

Now I did a bit of research, and there was a significant contingent of people arguing that a 1000 MHz splitter is just fine. That's the normal upper frequency range of the normal coax cable splitters set down everywhere when they ran them for cable TV. MoCA was designed, they argue, to run on top of existing coax without additional work, mainly by having super high transmission levels to blow across splitters that weren't actually designed for their frequency spectrum with raw power. if you had to swap out every pre-existing splitter to get MoCA to work, it would be a pretty crappy standard to try to re-use existing coax with.

That made sense to me, but a little Googling found me a coax splitter rated for a wider frequency range, that mentioned MoCA in the description, and had lower attenuation per output. It even had [BAMF](https://www.urbandictionary.com/define.php?term=BAMF) on the label, so all of this should lead to a stronger and faster MoCA signal between my two adapters.

![a photo of the new BAMF splitter](https://blog.benjamin-hering.com/images/moca/bamf-new-coax-splitter.jpg)

So I yanked out the old busted splitter and dropped in with the new BAMF hotness splitter, and tested again.

	$ ./iperf3 -c 10.0.20.65 -i 60 -t 900
	Connecting to host 10.0.20.65, port 5201
	[  4] local 10.0.20.75 port 50081 connected to 10.0.20.65 port 5201
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-60.00  sec  6.01 GBytes   861 Mbits/sec
	[  4]  60.00-120.00 sec  6.11 GBytes   875 Mbits/sec
	[  4] 120.00-180.00 sec  6.15 GBytes   881 Mbits/sec
	[  4] 180.00-240.00 sec  5.96 GBytes   854 Mbits/sec
	[  4] 240.00-300.00 sec  6.12 GBytes   876 Mbits/sec
	[  4] 300.00-360.00 sec  5.96 GBytes   854 Mbits/sec
	[  4] 360.00-420.00 sec  6.06 GBytes   867 Mbits/sec
	[  4] 420.00-480.00 sec  6.02 GBytes   862 Mbits/sec
	[  4] 480.00-540.00 sec  6.18 GBytes   885 Mbits/sec
	[  4] 540.00-600.00 sec  6.11 GBytes   874 Mbits/sec
	[  4] 600.00-660.00 sec  6.09 GBytes   873 Mbits/sec
	[  4] 660.00-720.00 sec  6.15 GBytes   881 Mbits/sec
	[  4] 720.00-780.00 sec  6.42 GBytes   919 Mbits/sec
	[  4] 780.00-840.00 sec  6.44 GBytes   923 Mbits/sec
	[  4] 840.00-900.00 sec  6.27 GBytes   897 Mbits/sec
	- - - - - - - - - - - - - - - - - - - - - - - - -
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-900.00 sec  92.1 GBytes   879 Mbits/sec                  sender
	[  4]   0.00-900.00 sec  92.1 GBytes   879 Mbits/sec                  receiver
	
	iperf Done.

Not only was it not any faster than the old pre-existing one, it was actually a bit slower! So the old busted splitter got re-installed into my coax network, and the new splitter got returned. Nothing against BAMF as a manufacturer - they made the POE filter that dramatically increased my MoCA bandwidth - but it doesn't seem to me that replacing pre-existing coax splitters with "MoCA certified" splitters actually translates into any better performance.

With the old multi-splitter back in place, I tested yet again, and it was even a touch faster than before.

	$ ./iperf3 -c 10.0.20.65 -i 60 -t 900
	Connecting to host 10.0.20.65, port 5201
	[  4] local 10.0.20.75 port 50214 connected to 10.0.20.65 port 5201
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-60.00  sec  6.06 GBytes   868 Mbits/sec
	[  4]  60.00-120.00 sec  6.13 GBytes   878 Mbits/sec
	[  4] 120.00-180.00 sec  6.30 GBytes   902 Mbits/sec
	[  4] 180.00-240.00 sec  6.26 GBytes   896 Mbits/sec
	[  4] 240.00-300.00 sec  6.33 GBytes   906 Mbits/sec
	[  4] 300.00-360.00 sec  6.36 GBytes   911 Mbits/sec
	[  4] 360.00-420.00 sec  6.43 GBytes   920 Mbits/sec
	[  4] 420.00-480.00 sec  6.40 GBytes   916 Mbits/sec
	[  4] 480.00-540.00 sec  6.30 GBytes   901 Mbits/sec
	[  4] 540.00-600.00 sec  6.32 GBytes   904 Mbits/sec
	[  4] 600.00-660.00 sec  6.44 GBytes   922 Mbits/sec
	[  4] 660.00-720.00 sec  6.35 GBytes   909 Mbits/sec
	[  4] 720.00-780.00 sec  6.41 GBytes   917 Mbits/sec
	[  4] 780.00-840.00 sec  6.42 GBytes   919 Mbits/sec
	[  4] 840.00-900.00 sec  6.43 GBytes   920 Mbits/sec
	- - - - - - - - - - - - - - - - - - - - - - - - -
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-900.00 sec  94.9 GBytes   906 Mbits/sec                  sender
	[  4]   0.00-900.00 sec  94.9 GBytes   906 Mbits/sec                  receiver
	
	iperf Done.
	
I'm guessing those coax screw connections hadn't been touched in years, and tightening them down back on to the old splitter might have helped things a bit. Again, I'll take the extra speed even if can't exactly tell you why.

## Can MoCA handle VLANS?

Even with all of the craziness of encryption and firmware updates, all MoCA is doing is playing the same role as dumb copper network cable, just with more blinking lights. It's a layer 1 (physical) connection that doesn't know or care about what higher layer protocols you're doing on top of it. 

As long as the equipment you have on either side of your blinking light MoCA cable can handle it, MoCA can handle it. I have a UniFi Access point at the end of mine handling tagged traffic from 3 VLANs. No complaints.

## To Conclude

If you can run a Cat 6 cable, run a Cat 6 cable. If you can't and some cable TV installer long ago already punched holes in your house to run coax, you can repupose it to something that does a decent job of pretending to be a Cat 6 cable, except:

* MoCA's more expensive than Cat 6 ($100-$150 for a pair of adapters)
* MoCA takes more AC power to run than Cat 6 (both adapters are plugged in and on 24/7)
* MoCA adds jitter and is less consistent about second to second throughput than Cat 6 
* MoCA has equivalent encryption of a Cat 6 cable (basically none), but adds a small liability of having those transmissions broadcast wider than a regular Cat 6 cable
* MoCA has the possibility of interfering with your neighbor's coax connected devices (without a POE filter), or a MoCA device your neighbor adds getting added to your network (without a POE filter or encryption enabled)
* MoCA introduces a trivially easy denial of service attack to someone with access to your network
* And if you have more than a just a single pair of MoCA adapters, the overall bandwidth is shared across all of the adapters; like wifi radios or old-school network hubs.

BUT, in exchange for those limitations you get around 90% of the way to gigabit bandwidth between the adapters without the hassle of punching any new holes in your house. For older houses where it's painful, expensive and time consuming to try to run new network cables in the walls, MoCA is a much simpler alternative.

For brand new house construction? Save yourself the headache. Just run the Cat 6 cables to every room. 