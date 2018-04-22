---
layout: post
title: MoCA - Almost as good as copper
---

So after slamming in the [UniFi WiFi system](https://blog.benjamin-hering.com/A-Basic-Unifi-Security-Setup/), I had rock solid internet *almost* everywhere in my house, except the desk where I actually work from home. That one corner - the one place where I actually do work people sometimes pay me for - had WiFi speeds 90% slower than everywhere else. And as [The Oatmeal](http://theoatmeal.com/comics/no_internet) points out, the only thing worst than no internet is slow internet.

This obviously could not stand.

My wife (who is generally speaking, wiser, kinder and an all around better person than I am) convinced me that drilling an insanely large numbers of exploratory holes around the house for the mere possibility of running a single Cat 6 cable was probably not the best course of action. I explored the vast arrays of options out there of how to extend my network without actually running any new cable.

## The Options

My first option was to grab [UniFi's Mesh Router](https://unifi-mesh.ubnt.com/#products). I decided to leave that as a last resort. Chaining together a bunch of WiFi radios together is not the first choice for low latency connections. And while Ubiquiti advertises it as "Gigabit" they get that number by summing the maximum physically possible bandwidth of both 2.4 Ghz and 5 Ghz radios together. With no one device (at least that I own) would be spanning across both frequency spectrums at the same time and wanting to stay as close to gigabit line speeds as I could, I saved that as a last resoort

The next attempt was using [powerline adapters](https://www.tp-link.com/us/products/details/cat-5509_TL-PA7010-KIT.html). These guys basically take the existing power wiring that's already run throughout your house and add a small data signal to them. While they worked fine if both adapters were on the same power circuit, jumping the signal through the circuitbreaker box dropped the bandwidth significantly. In my case, I was getting 2% of the promised 'gigabit' bandwidth and actually slower than the wifi issue I was trying to fix.

The last option I saw was to try to use Multimedia over Coaxial or MoCA. This is a standard developed back in 2004 for using bandwidth sections not used by Cable TV or DOCSIS (how cable internet gets to you over coax). In general, those other items are sending things from 45 Mhz to 1000 Mhz, and MoCA will happily transmit from 1000 to 1500 Mhz. My (incredibly basic) understanding of coax attenuation is that the higher the frequency the higher the attenuation (dB of signal loss per foot of cable). Thus the higher MoCA frequency range is mostly worthless to the cable company who has to worry about cable runs measured in miles, but is just fine for connections inside of a single house measured in a few hundred feet.

As standards improved and bandwidth needs increased, there's started to be some conflict between the two in frequency spectrums in the latest DOCSIS 3.1 and MoCA 2.5 standards, but that's something smart electrical engineers can fight with. With my area currently only DOCSIS 3.0 and MoCA 2.0 advertising up to the gigabit speed I'm hoping for, I'm don't have to worry about those details quite yet.

MoCA first saw use as a way for devices already connected via coax to share information with each other (DVRs or TiVO boxes streaming a show recorded on one box to another for example) but with a few adapters you can use the same standard to basically run the equivalent of an ethernet cable over whatever coax cable lines are already in place for cable TV. Actiontec seems to make what was the industry standard MoCA adapters for a long while, but I ended up going with a pair of [Motorola MM1000s](https://motorolanetwork.com/mm1000.html) a newer entry to the market because they supported at least some encryption between the two adapters and were about a third less expensive.

## Getting a Baseline

As my connection out to the internet is not near gigabit speeds, I needed something internally to do bandwidth tests across my network to actually evaluate how close my new MoCA adapters were getting to actual gigabit speed. I used [iperf3](https://iperf.fr/iperf-download.php) as a systems agnostic internal bandwidth test. The most basic of tests are simple. One computer needs to act as the server, which is done by running iperf3 with the -s flag

`./iperf3 -s`

While a client computer initiates the test by the -c flag and pointing to the hostname or IP address of the server computer

`./iperf3 -c <server ip>`

There's more flags with more options to fiddle with the defaults, but the commands above are sufficient for a simple speedtest. To get a baseline, I started with just seeing what my network's normal behavior is with just ethernet cables. For context, my baseline hardware for these tests are:

* A Unifi US-8-60W gigabit switch
* Two Macs with Thunderbolt gigabit ethernet adapters
* Cat 5E or Cat 6 cable for all the interconnects

Here's the raw baseline before doing anything with the MoCA adapters


Raw ethernet


	`$ ./iperf3 -c 10.0.20.65
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
	[ ID] Interval           Transfer     Bandwidth
	[  4]   0.00-10.00  sec  1.09 GBytes   940 Mbits/sec                  sender
	[  4]   0.00-10.00  sec  1.09 GBytes   940 Mbits/sec                  receiver
	iperf Done.`

Direct Coax link

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

 $ ./iperf3 -c 10.0.20.65
Connecting to host 10.0.20.65, port 5201
[  4] local 10.0.20.75 port 51805 connected to 10.0.20.65 port 5201
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-1.00   sec   107 MBytes   902 Mbits/sec
[  4]   1.00-2.00   sec   112 MBytes   939 Mbits/sec
[  4]   2.00-3.00   sec   106 MBytes   892 Mbits/sec
[  4]   3.00-4.00   sec  79.9 MBytes   671 Mbits/sec
[  4]   4.00-5.00   sec  97.3 MBytes   817 Mbits/sec
[  4]   5.00-6.00   sec   111 MBytes   930 Mbits/sec
[  4]   6.00-7.00   sec   104 MBytes   873 Mbits/sec
[  4]   7.00-8.00   sec   112 MBytes   940 Mbits/sec
[  4]   8.00-9.00   sec   112 MBytes   940 Mbits/sec
[  4]   9.00-10.00  sec   112 MBytes   940 Mbits/sec
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-10.00  sec  1.03 GBytes   884 Mbits/sec                  sender
[  4]   0.00-10.00  sec  1.03 GBytes   884 Mbits/sec                  receiver

iperf Done.

 $ ./iperf3 -c 10.0.20.65
Connecting to host 10.0.20.65, port 5201
[  4] local 10.0.20.75 port 51808 connected to 10.0.20.65 port 5201
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-1.00   sec   108 MBytes   902 Mbits/sec
[  4]   1.00-2.00   sec   112 MBytes   939 Mbits/sec
[  4]   2.00-3.00   sec  88.1 MBytes   739 Mbits/sec
[  4]   3.00-4.00   sec  86.9 MBytes   729 Mbits/sec
[  4]   4.00-5.00   sec   110 MBytes   922 Mbits/sec
[  4]   5.00-6.00   sec   106 MBytes   886 Mbits/sec
[  4]   6.00-7.00   sec   112 MBytes   941 Mbits/sec
[  4]   7.00-8.00   sec   112 MBytes   940 Mbits/sec
[  4]   8.00-9.00   sec   106 MBytes   893 Mbits/sec
[  4]   9.00-10.00  sec   112 MBytes   940 Mbits/sec
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-10.00  sec  1.03 GBytes   883 Mbits/sec                  sender
[  4]   0.00-10.00  sec  1.03 GBytes   883 Mbits/sec                  receiver

iperf Done.

Okay, let's secure stuff.

http://www.motorolacable.com/mocasecurity/

HTTPS doesn't work... ok

Ugh, Whois is bad
And redirect to home is another entire domain, different whois, different registrar.
Gross...

Need to update firmware out of the box to update: http://www.motorolacable.com/support/MM1000/firmware/

Update to 1.0.0.8 ( no checksum, no HTTPS, lol!)
Still no admin password to router
Had to clear cache to get right info on the second router! (Incognito mode)

Still all over the place:

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
[master]C02P701TG3QT:Downloads $ ./iperf3 -c 10.0.20.65
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
[master]C02P701TG3QT:Downloads $ ./iperf3 -c 10.0.20.65
Connecting to host 10.0.20.65, port 5201
[  4] local 10.0.20.75 port 55039 connected to 10.0.20.65 port 5201
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-1.00   sec   108 MBytes   902 Mbits/sec
[  4]   1.00-2.00   sec  93.1 MBytes   781 Mbits/sec
[  4]   2.00-3.00   sec  65.7 MBytes   551 Mbits/sec
[  4]   3.00-4.00   sec  7.96 MBytes  66.5 Mbits/sec
[  4]   4.00-5.00   sec  16.5 MBytes   139 Mbits/sec
[  4]   5.00-6.00   sec  75.2 MBytes   631 Mbits/sec
[  4]   6.00-7.00   sec   107 MBytes   895 Mbits/sec
[  4]   7.00-8.00   sec   112 MBytes   940 Mbits/sec
[  4]   8.00-9.00   sec  48.5 MBytes   405 Mbits/sec
[  4]   9.00-10.01  sec  1.21 MBytes  10.1 Mbits/sec
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-10.01  sec   634 MBytes   532 Mbits/sec                  sender
[  4]   0.00-10.01  sec   634 MBytes   532 Mbits/sec                  receiver

iperf Done.
[master]C02P701TG3QT:Downloads $ ./iperf3 -c 10.0.20.65
Connecting to host 10.0.20.65, port 5201
[  4] local 10.0.20.75 port 55053 connected to 10.0.20.65 port 5201
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-1.00   sec   108 MBytes   903 Mbits/sec
[  4]   1.00-2.00   sec   112 MBytes   939 Mbits/sec
[  4]   2.00-3.00   sec  98.5 MBytes   826 Mbits/sec
[  4]   3.00-4.00   sec  55.0 MBytes   461 Mbits/sec
[  4]   4.00-5.00   sec  10.8 MBytes  90.5 Mbits/sec
[  4]   5.00-6.00   sec  45.8 MBytes   384 Mbits/sec
[  4]   6.00-7.00   sec  78.7 MBytes   661 Mbits/sec
[  4]   7.00-8.00   sec   103 MBytes   862 Mbits/sec
[  4]   8.00-9.00   sec  90.4 MBytes   758 Mbits/sec
[  4]   9.00-10.00  sec  73.4 MBytes   616 Mbits/sec
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-10.00  sec   775 MBytes   650 Mbits/sec                  sender
[  4]   0.00-10.00  sec   775 MBytes   650 Mbits/sec                  receiver

iperf Done.

Let's add encryption:

> Important! You must perform a factory reset on the MM1000. Using a pin or straightened paperclip, press and hold the RESET button for three (3) seconds. Please wait 45 seconds while the MM1000 restores its factory default settings.

./iperf3 -c 10.0.20.65
Connecting to host 10.0.20.65, port 5201
[  4] local 10.0.20.75 port 55367 connected to 10.0.20.65 port 5201
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-1.00   sec   103 MBytes   862 Mbits/sec
[  4]   1.00-2.00   sec  84.6 MBytes   710 Mbits/sec
[  4]   2.00-3.00   sec  89.4 MBytes   750 Mbits/sec
[  4]   3.00-4.00   sec   110 MBytes   920 Mbits/sec
[  4]   4.00-5.00   sec   110 MBytes   926 Mbits/sec
[  4]   5.00-6.00   sec  78.0 MBytes   653 Mbits/sec
[  4]   6.00-7.00   sec  3.16 MBytes  26.4 Mbits/sec
[  4]   7.00-8.00   sec  4.73 MBytes  39.9 Mbits/sec
[  4]   8.00-9.00   sec  54.6 MBytes   458 Mbits/sec
[  4]   9.00-10.00  sec  16.9 MBytes   142 Mbits/sec
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-10.00  sec   654 MBytes   549 Mbits/sec                  sender
[  4]   0.00-10.00  sec   654 MBytes   549 Mbits/sec                  receiver

iperf Done.
[master]C02P701TG3QT:Downloads $ ./iperf3 -c 10.0.20.65
Connecting to host 10.0.20.65, port 5201
[  4] local 10.0.20.75 port 55379 connected to 10.0.20.65 port 5201
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-1.00   sec  84.4 MBytes   708 Mbits/sec
[  4]   1.00-2.00   sec  77.6 MBytes   651 Mbits/sec
[  4]   2.00-3.00   sec  34.0 MBytes   285 Mbits/sec
[  4]   3.00-4.00   sec  3.87 MBytes  32.4 Mbits/sec
[  4]   4.00-5.00   sec  5.34 MBytes  44.9 Mbits/sec
[  4]   5.00-6.00   sec  42.3 MBytes   355 Mbits/sec
[  4]   6.00-7.00   sec  94.5 MBytes   793 Mbits/sec
[  4]   7.00-8.00   sec   110 MBytes   924 Mbits/sec
[  4]   8.00-9.00   sec   101 MBytes   843 Mbits/sec
[  4]   9.00-10.00  sec  94.7 MBytes   794 Mbits/sec
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-10.00  sec   647 MBytes   543 Mbits/sec                  sender
[  4]   0.00-10.00  sec   647 MBytes   543 Mbits/sec                  receiver

iperf Done.
[master]C02P701TG3QT:Downloads $ ./iperf3 -c 10.0.20.65
Connecting to host 10.0.20.65, port 5201
[  4] local 10.0.20.75 port 55385 connected to 10.0.20.65 port 5201
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-1.00   sec   108 MBytes   902 Mbits/sec
[  4]   1.00-2.00   sec   109 MBytes   916 Mbits/sec
[  4]   2.00-3.00   sec  87.2 MBytes   731 Mbits/sec
[  4]   3.00-4.00   sec  90.8 MBytes   761 Mbits/sec
[  4]   4.00-5.00   sec  94.0 MBytes   789 Mbits/sec
[  4]   5.00-6.00   sec  94.6 MBytes   794 Mbits/sec
[  4]   6.00-7.00   sec   107 MBytes   896 Mbits/sec
[  4]   7.00-8.01   sec   109 MBytes   907 Mbits/sec
[  4]   8.01-9.00   sec  98.9 MBytes   834 Mbits/sec
[  4]   9.00-10.00  sec   104 MBytes   872 Mbits/sec
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-10.00  sec  1002 MBytes   840 Mbits/sec                  sender
[  4]   0.00-10.00  sec  1002 MBytes   840 Mbits/sec                  receiver

iperf Done.

Still varies. All over the place.

Now to add in line...

./iperf3 -c 10.0.20.65
Connecting to host 10.0.20.65, port 5201
[  4] local 10.0.20.75 port 55686 connected to 10.0.20.65 port 5201
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-1.00   sec  91.4 MBytes   767 Mbits/sec
[  4]   1.00-2.00   sec  95.7 MBytes   802 Mbits/sec
[  4]   2.00-3.00   sec  96.3 MBytes   808 Mbits/sec
[  4]   3.00-4.00   sec  80.3 MBytes   671 Mbits/sec
[  4]   4.00-5.00   sec  5.91 MBytes  49.6 Mbits/sec
[  4]   5.00-6.00   sec  15.7 MBytes   132 Mbits/sec
[  4]   6.00-7.00   sec  2.53 MBytes  21.2 Mbits/sec
[  4]   7.00-8.00   sec  2.18 MBytes  18.3 Mbits/sec
[  4]   8.00-9.00   sec  2.90 MBytes  24.3 Mbits/sec
[  4]   9.00-10.00  sec  24.8 MBytes   209 Mbits/sec
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-10.00  sec   418 MBytes   351 Mbits/sec                  sender
[  4]   0.00-10.00  sec   418 MBytes   350 Mbits/sec                  receiver

iperf Done.
[master]C02P701TG3QT:Downloads $ ./iperf3 -c 10.0.20.65
Connecting to host 10.0.20.65, port 5201
[  4] local 10.0.20.75 port 55689 connected to 10.0.20.65 port 5201
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-1.00   sec  90.2 MBytes   757 Mbits/sec
[  4]   1.00-2.00   sec  95.6 MBytes   802 Mbits/sec
[  4]   2.00-3.00   sec  96.1 MBytes   806 Mbits/sec
[  4]   3.00-4.00   sec  95.4 MBytes   800 Mbits/sec
[  4]   4.00-5.00   sec  95.4 MBytes   801 Mbits/sec
[  4]   5.00-6.00   sec  96.2 MBytes   807 Mbits/sec
[  4]   6.00-7.00   sec  95.0 MBytes   797 Mbits/sec
[  4]   7.00-8.00   sec  95.1 MBytes   798 Mbits/sec
[  4]   8.00-9.00   sec  94.7 MBytes   794 Mbits/sec
[  4]   9.00-10.00  sec  95.0 MBytes   797 Mbits/sec
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-10.00  sec   949 MBytes   796 Mbits/sec                  sender
[  4]   0.00-10.00  sec   948 MBytes   795 Mbits/sec                  receiver

iperf Done.
[master]C02P701TG3QT:Downloads $ ./iperf3 -c 10.0.20.65
Connecting to host 10.0.20.65, port 5201
[  4] local 10.0.20.75 port 55700 connected to 10.0.20.65 port 5201
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-1.00   sec  86.7 MBytes   727 Mbits/sec
[  4]   1.00-2.00   sec  91.7 MBytes   769 Mbits/sec
[  4]   2.00-3.00   sec  91.5 MBytes   768 Mbits/sec
[  4]   3.00-4.00   sec  91.4 MBytes   766 Mbits/sec
[  4]   4.00-5.00   sec  93.5 MBytes   784 Mbits/sec
[  4]   5.00-6.00   sec  95.9 MBytes   805 Mbits/sec
[  4]   6.00-7.00   sec  95.4 MBytes   800 Mbits/sec
[  4]   7.00-8.00   sec  94.8 MBytes   795 Mbits/sec
[  4]   8.00-9.00   sec  92.0 MBytes   772 Mbits/sec
[  4]   9.00-10.00  sec  91.5 MBytes   768 Mbits/sec
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-10.00  sec   924 MBytes   775 Mbits/sec                  sender
[  4]   0.00-10.00  sec   924 MBytes   775 Mbits/sec                  receiver

iperf Done.

Longer tests more consistent:

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

Then moved to adding the POE Filter "Reflector"

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

Now to the shiny new "BAMF" splitter

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

It's actually a touch worse!

Replaced back the old-bustedness

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