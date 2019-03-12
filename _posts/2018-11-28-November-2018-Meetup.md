---
layout: post
title: November 2018 meetup
---

**Matt** presented the usual news roundup.
**Lachlan** and **Brian** discussed the _Parallax Propeller 2_, a powerful microcontroller with some unique characteristics particularly well suited to concurrent solutions. 
It doesn't - yet - run MicroPython but it could be a good fit for a port. We were fortunate enough to see a demo on one of the first 10 'glob top' chips.
**Damien** explained how to use the `_thread` module, recently overhauled on the ESP32 port.

## News: Matt Trentini
* Congrats to Damien
    * Recently a father for the second time!
* [Time to Say Goodbye to Arduino and Go On to Micropython/Adafruit Circuitpython?](https://www.youtube.com/watch?v=m1miwCJtxeM&t=3s)
    * Very popular video by Andreas Spiess that compared Arduino and MicroPython
    * Matt and Damien to supply some content for a follow-up video
* [Python will be the official programming language for education in France](https://twitter.com/nnja/status/1062621193696612352?lang=en)
* Miscellaneous
    * [CircuitPython 4.0.0 alpha 3](https://forums.adafruit.com/viewtopic.php?f=60&t=142379)
    * Decent [tutorials with the M5Stack](http://forum.m5stack.com/topic/402/lesson-19-led-bar-mic-lightmusic)
    * [Eight MicroPython Lessons](https://itywik.org/2018/10/30/eight-micropython-python-experiments-for-the-esp32/)
* OHS Badge
    * Fantastic badge created for the [2018 Open Hardware Summit](https://2018.oshwa.org/). MicroPython, eInk, ESP32, accelerometer, capacitive touch buttons - hacking encouraged!
    * [Hackaday.io](https://hackaday.io/project/112222-2018-open-hardware-summit-badge), [Official docs](https://oshwabadge2018.github.io/)
    * HUGE thanks to Drew Fustini ([@pdp7](https://twitter.com/pdp7)) for sending me a board, much appreciated Drew!
    * ~US$50 on [Tindie](https://www.tindie.com/products/pdp7/open-hardware-summit-2018-badge/)
 * [Beetle ESP32](https://www.dfrobot.com/product-1798.html)
    * A small, affordable (~US$15) ESP32 board capable of running MicroPython
 * [Adafruit Trellis M4](https://www.adafruit.com/product/4020)
    * Powerful SAMD51, 192KB RAM, 512KB+8MB flash, accelerometer, great audio support and 4x8 elastomer buttons lit with neopixels
    * Runs CircuitPython
    * ~US$60
* [Blyst Nano](https://www.crowdsupply.com/i-syst/blyst-nano)
    * A _tiny_ Nordic NRF52832 module; Cortex M4F, BT and 30 GPIO
    * ~US$20
* [wESP32](https://www.crowdsupply.com/silicognition/wesp32)
    * ESP32 with Ethernet + POE
    * ~US$65
* [Sensything](https://www.crowdsupply.com/protocentral/sensything)
    * Data acquisition board
    * ESP32, TI 24bit ADC, QWIIC connectors
    * ~US$60
* [Fomu](https://www.crowdsupply.com/sutajio-kosagi/fomu)
    * An FPGA inside your USB port
    * Capable of running MicroPython
* [PyLife and PyGo](https://www.kickstarter.com/projects/pycom/pylife-and-pygo-the-most-connected-device-in-the-w)
    * Looks to be based on FiPy? Non-cellular and cellular options.
    * ESP32, wireless charging, OLED, GPS, touchscreen, accelerometer
    * ~US$80
* [Meadow](https://www.kickstarter.com/projects/meadow/meadow-full-stack-net-standard-iot-platform)
    * MicroPython competitor! .NET development on an embedded device.
    * 216MHz STM32F7, 16MB RAM, 32MB Flash, ESP32 for wifi
    * Feather form-factor
    * ~US$70
* [MAKERphone](https://www.kickstarter.com/projects/albertgajsak/makerphone-an-educational-diy-mobile-phone)
    * An amazing DIY cellular phone
    * ~US$100
* [Sipeed MAIX](https://www.indiegogo.com/projects/sipeed-maix-the-world-first-risc-v-64-ai-module#/)
    * Affordable - and very feature-rich - **RISC-V** microcontroller
    * 400MHz, 8MB RAM, KPU, audio processor, ESP8285 for wifi
    * Breakout boards, cameras, all sorts of interesting hardware
    * ~US$5
* Interesting projects
    * [Bike helmet signalling](https://twitter.com/Unix_Guru/status/1066050372593164290)
    * [SQLite in ESP-IDF](https://github.com/siara-cc/esp-idf)
    * [ISS Overhead Check](https://github.com/mrprompt/ISS-Overhead-Check)
    * [Flashing MicroPython on Kano Pixel Kit](https://www.instructables.com/id/Flashing-MicroPython-on-Kano-Pixel-Kit/)
    * [Snakes on a bookshelf](https://stonecharioteer.gitlab.io/blog/snakes_on_a_bookshelf.html)
    * [1024 LED Matrix WiFi Message Board](https://www.hackster.io/ericBcreator/1024-led-matrix-wifi-message-board-with-menu-web-interface-1b2666)
* Other News
    * Boochow continues to forge on with his [MicroPython port on bare metal Raspberry Pi](https://github.com/boochow/micropython-raspberrypi)
    * [TinyPICO](http://tinypico.com/) development continues
      * _Tiny_ board (18x32mm), ESP32 PICO D4, 4MB PSRAM, LiPo charging, 14 GPIO, onboard RGB LED


<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSxmXbfAVq3xdfpcWJIebLEI60oOgRiRkkX2sKjk7caij0WJzkrp0osULZbQcUbYH7kO7NznvzNUHib/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

<iframe width="960" height="569" src="https://www.youtube.com/embed/dX1_TDnzfcA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Lachlan and Brian on the Parallax Propeller 2

<iframe width="960" height="569" src="https://www.youtube.com/embed/Xcm6kVhIrJQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Damien George on Threads in MicroPython

<iframe width="960" height="569" src="https://www.youtube.com/embed/aDXgX0rGVDY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
