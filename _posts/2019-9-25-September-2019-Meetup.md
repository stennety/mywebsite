---
layout: post
title: September 2019 meetup
---

**Matt** Trentini discussed the latest and greatest MicroPython [news](#News-roundup) and **Andrew** Leech showed us how he's set up a [Gitlab CI system](#ci) to build *every* MicroPython port in less than ten minutes.

## News roundup
<a name="News-roundup"></a>
<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vR1oBx0YBv2r41WxiYtzkYgIRpQdbl1oLxVPDRix2O9aqOlXJyaYKg-SNw1CGWbidq7HWANfhJmP9c7/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

<iframe width="960" height="569" src="https://www.youtube.com/embed/cZlFqPEvEmY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Sad day
* Left my box of hardware on the train
* ~80 microcontrollers are touring Melbourne on our train network

### CCHS News
* CCHS BBQ Oct 6th
* AI cars outreach day Dec 28th

### Building an IoT Server with Flask and Python
* [Tutorial](https://pythonforundergradengineers.com/flask-iot-server-motivation.html) from Peter Kazarinoff
  * Details how to measure temperature and send it to a server in the cloud
* End-to-end
  * Cloud server, running flask/SQLite
  * ESP8266 with temp sensor

### PineTime watch
* [Pine64](https://www.pine64.org/) make interesting hardware, particularly SBC’s
  * Good track-record of working with developers
* Recently announced a watch is coming
  * Currently nRF52832 but considering nRF52840
  * Seem to be aiming to interest developers
  * Aiming for **US$25**

### MicroPython Binding
* Amirgorn: [Pure Micropython Display Driver](https://blog.littlevgl.com/2019-08-05/micropython-pure-display-driver#micropython-api-to-any-c-library)
  * Wrote a pure MicroPython library for the ILI9341
  * Also used pure C driver in LittlevGL
  * Then, built a hybrid! Started a driver in Python, used his Binding tool to parse C and create a MicroPython C module
    * Technique can be used with any C library
* Also, Hackaday: [MicroPython and C Play together better](https://hackaday.com/2019/08/31/micropython-and-c-play-together-better/)

### Apothewell
* [Prototype for a pill dispenser](https://apothewell.com/the-first-big-moment/) by Daniel Sharp
  * Has a son that is reliant on medications
* Began with some [help from Miguel Grinberg](https://apothewell.com/things-got-rolling-with-a-wheel-and-miguel/)
  * Remember: a little help can go a long way!

### Blip
* Electronut Labs released [Blip on Crowd Supply](https://www.crowdsupply.com/electronut-labs/blip)
  * nRF52840: 256KB RAM, 1MB flash - and BLE
  * Zephyr, Arduino, CircuitPython…
  * Sensors: Accelerometer, light, humidity/temp, debugger
  * Optional shields: ePaper and Gaming
  * **US$55** + US$8 shipping

### Microsoft: Python for Beginners

* [Python for Beginners](https://www.youtube.com/playlist?list=PLlrxD0HtieHhS8VzuMCfQD4uJ9yne1mE6) video series by Microsoft
  * Set of 44 (!) videos, free, on YouTube
  * Looks like good quality, quite in-depth

### Sparkfun Artemis port
* Michael Welling on [Twitter](https://twitter.com/QwertyEmbedded/status/1174822225028894720):
  * “I have a start on a Micropython port for the Artemis if you are interested”
* Released on [Github](https://github.com/mwelling/micropython/tree/artemis/ports/artemis) overnight…
  * Remember to [configure the toolchain](https://twitter.com/QwertyEmbedded/status/1176630083533979648)
* Specs
  * Cortex M4F, 96MHz, BLE, 48 GPIO, 31 PWM, FCC certified
  * Modules: **US$8.95**
  * Boards: US$15-25

### CCCamp2019 Badge
* Dual core M4F, 96MHz, 512KB, 1+8MB Flash
* ECG, accelerometer/gyro, temp/humidity, RGB LEDs, display
* MicroPython
* Excellent documentation
* [Hackaday article](https://hackaday.com/2019/08/29/hands-on-cccamp2019-badge-is-a-sensor-playground-not-to-be-mistaken-for-a-watch/)
* Cannot yet be bought for love nor money

### Quotes
* “I do think MicroPython is the future for embedded electronics”
* “...I think Python has already managed to vanquish its challengers”


<a name="ci"></a>
## Gitlab Continuous Integration for MicroPython 
Andrew demonstrated his [Gitlab Continuous Integration system](https://gitlab.com/alelec/micropython_ci/pipelines/latest) that builds *every* port of MicroPython in under ten minutes. Impressive!

<iframe width="960" height="569" src="https://www.youtube.com/embed/qc1bTOdMbrA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
