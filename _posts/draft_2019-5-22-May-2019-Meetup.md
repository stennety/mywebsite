---
layout: post
title: April 2019 meetup
---

**Matt** Trentini presented the [news roundup](#News-roundup), **Damien** George, to celebrate MicroPython's 6th birthday, presented a fun talk about the [Early Days of MicroPython](#Early-Days-Of-MicroPython). **Peter** Boin covered [uPyTester](#uPyTester) a library he's created to perform Hardware-in-the-Loop testing.


## News roundup
<a name="News-roundup"></a>
<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSiQvizEfk9ZgTBpZ_CiWsgwThJrsu3GQRU6mdqm_-D6QqH2kVybWe9BqssoPLSTcGT95Wg1eTQ5r2g/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

<iframe width="960" height="569" src="https://www.youtube.com/embed/O-skW4V4Mlg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### PyBoard D
* Small, powerful, low-power microcontroller
* STM32 F7 series: 216MHz
* Currently 3 variants
  - 512KB-2MB flash, 256KB-512KB RAM
  - One has high speed USB
* WiFi/Bluetooth 4.1
* Plenty of GPIO/peripherals
* Breadboard/castellation/headers

### Season of Docs
* MicroPython has applied to Google for their first [Season of Docs](https://developers.google.com/season-of-docs/)
* It’s an effort to improve documentation for Open Source projects
* Read our [proposal](https://docs.google.com/document/d/1Yvca_dFPn_-BwWdsI4lUT4p-rjn5CvhrVgupiLC60_A)
* Some of the ideas
  - Restructure common/port specific
  - Improve documentation for existing ports
  - Getting Started guide
  - Developer documentation 

### MicroPython video tutorials
* [#1 - Let’s get started](https://www.youtube.com/watch?v=5W3WvXAmDJc&t=1s)
* [#2 - Hit the Ground Running](https://www.youtube.com/watch?v=DFp_T-H3eRc&t=1s)
* [#3 - Some Fundamentals](https://www.youtube.com/watch?v=Rd9V6qEIfv4&t=17s)

### Lego <3's MicroPython
* [Program in Python with EV3](https://education.lego.com/en-us/support/mindstorms-ev3/python-for-ev3?fbclid=IwAR3-1rwHexXYCnA-yzwQAY8mTNBndmc51p3BTvWcL7lUXk6dNOCzaQfMuJU)
  - EV3 is an ARM9 Linux computer, runs MicroPython Unix port
* But the next model, [part of SPIKE](https://blog.adafruit.com/2019/04/15/python-snakes-its-way-to-lego-spike-prime-lego_group-lego_education-micropython-legoconfidence/), will run bare metal
  - 100MHz processor
  - Due in the August timeframe

### PyCon AU 2019
* August 2-6 @ ICC Sydney
* [Call for Proposals](https://2019.pycon-au.org/speak/) now open
  - Opened April 3, **closes May 5**
  - Mentors available
  - 30 min talks
    - This year: 70 min [Deep Dive Talks](https://2019.pycon-au.org/news/deep-dive-talks/) are possible
* Specialist tracks
  - Education, Django, Security and Privacy and Science and Data

### Bite-sized
* OpenMV Cam H7 [is shipping](https://openmv.io/blogs/news/openmv-cam-h7-shipping-update)
* Humble Bundle [Electronics + 3D printing](https://www.humblebundle.com/books/electronics-3d-printing-make-books)
  - 5 books for <$2, 12 for $12, 18 for $21, 24 for $25
* [Electronut Papyr](https://docs.electronut.in/papyr/) now has [official CircuitPython support](https://twitter.com/electronutLabs/status/1118197834040233984)
  - Need a MicroPython demo!
* [Very Simple MicroPython Web Clock](https://www.hackster.io/alankrantas/very-simple-micropython-esp8266-esp-12-web-clock-3c5c6f)
* [SHA 2017 Badge e-ink Gameboy](https://trmm.net/Gamebadge)
* [MQTT-Enabled Scrolling Text](https://www.hackster.io/andreas-motzek/mqtt-enabled-scrolling-text-with-esp8266-and-micropython-086238)
* [New ESP32 chip coming](https://twitter.com/EspressifSystem/status/1108044835766689792)
  - Rumours: Cheaper, single core, USB, no Bluetooth, more GPIO
* [Bluetooth implementation progressing](https://github.com/micropython/micropython/pull/4589)
* [LoDev S76S available on Crowd Supply](https://www.crowdsupply.com/ronoth/lodev)
  - STM32L0 + SemTech 1276
  - Hoping for MicroPython (Tight: 129KB/20KB)
* [Miguel Grinberg: Introducing My MicroPython Tutorial](https://blog.miguelgrinberg.com/post/introducing-my-micropython-tutorial)
* Ray Ozzie has [started using Python on uC's](https://twitter.com/rozzie/status/1106531501317992448)
  - Enjoys it but is frustrated with the different APIs
* ESP32 Coincell boards
  - [Mike Rankin's Coin Cell board](https://twitter.com/mikerankin)
  - [Alex Albino's Femtobeacon](https://twitter.com/femtoduino)

### TinyPICO update
* Matte black
* Shields!
  - Play Board
  - Proto shield
  - RTC shield
  - Audio shield
  - Grove I2C shield
  - IO expander shield?
* Launching soon™ on Crowd Supply

### Happy Birthday MicroPython
* 'Born' 29th April 2013
* Six years old next week

<a name="Early-Days-Of-MicroPython"></a>
## Early Days Of MicroPython
Happy Birthday MicroPython!

April 29, 2019 is the sixth 'birthday' of MicroPython. At the April Melbourne Meetup, Damien George, creator of MicroPython, delves into his archives and shows the earliest code and notes about the goals of the language. The material pre-dates the first git commit!

Listen in as Damien reveals how and why the language began and evolved. It's a nice way to celebrate MicroPython's sixth birthday!

<iframe width="960" height="569" src="https://www.youtube.com/embed/NBAqOYYW6vM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<a name="uPyTester"></a>
## uPyTester
Peter Boin talks about uPyTester, his MicroPython library to perform Hardware In The Loop testing.

Check out the [uPyTester documentation](https://fragmuffin.github.io/upytester/doc/) and [uPyTester Github repository](https://github.com/fragmuffin/upytester).

<iframe width="960" height="569" src="https://www.youtube.com/embed/wpu0emwbjQw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



