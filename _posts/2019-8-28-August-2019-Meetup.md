---
layout: post
title: August 2019 meetup
---

**Matt** Trentini covered the latest [news](#News-roundup), **Damien** schooled us on [Native Modules (part II)](#native-modules) and interstate guess **Jim** Mussared talked the recent developments on [BLE on MicroPython](#ble-micropython).

## News roundup
<a name="News-roundup"></a>
<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQjQvD3zGHjoekItD_3kD5NhS4FBkzjvr_XZ4AEDlpw6thCMB9mBe-MX-TpwXJdXWeu3yG-HSmlNDZK/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

<iframe width="960" height="569" src="https://www.youtube.com/embed/xEZ-Mgb6egc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### New Hardware...
* [M5stickV](https://m5stack.com/products/stickv)
  - Kendryte K210, dual-core 400MHz, 8MB RAM, 16MB flash, camera, display, audio
* [Ronoth LoDev](https://www.crowdsupply.com/ronoth/lodev)
  - S76S SiP (STM32L073 - 20KB RAM, 192KB flash, SX1276 LoRa radio)

### Teensy 4.0
* New Teensy 4.0 Blows Away Benchmarks
* Cortex M7 @**600MHz** 1MB RAM, 2MB flash
  - NXP iMXRT1062
* 2xUSB @480MHz, 3xSPI, 3xI2C, 7xSerial
* 40x digital pins, 14 analog (2xADC)
* Small
* A MicroPython (OpenMV) port available
* **US$20**

### Orange Crab
* Greg Davill’s [latest project](https://blog.hackster.io/say-hello-to-the-orangecrab-16835001f36a)...
* Feather form-factor
* Lattice ECP5 FPGA
* 1GB DDR3 RAM, 16MB flash
* Expecting to port Fomu MicroPython
* “Half of the parts are just 0201 decoupling caps”
* [Twitter thread](https://twitter.com/GregDavill/status/1151459422280884225)


### Stage
* [Stage, a Tile and Sprite Engine](https://www.hackster.io/deshipu/stage-a-tile-and-sprite-engine-e9e655?utm_campaign=new_projects&utm_content=0&utm_medium=email&utm_source=hackster&utm_term=project_name) has been released by [Deshipu](https://twitter.com/deshipu)
* Runs on M5Stack, or against ST7735 displays
* C for fast blitting but mostly MicroPython
* More details [in the forum](https://forum.micropython.org/viewtopic.php?f=15&t=6771)

### PyLadies workshop
* PyLadies MicroPython on October 21
* Taking the opportunity to improve the beginner experience
* Want to put together a beginner kit
  - Could be used at the meetup
  - Folks could optionally purchase them
* Base it around the Wemos ESP8266 with shields
  - No breadboarding!
  - Affordable

### Slack and Unexpected Maker Discord Server
* More than 200 users now on Slack ([auto invite](https://slack-micropython.herokuapp.com/))
* Unexpected Maker has a [Discord Server](https://discordapp.com/invite/vGgduY7)

### ASCII 0_1 Stream
* First [tutorial](https://www.hackster.io/jpilarski360/ascii-0-1-stream-98a1a1?utm_campaign=new_projects&utm_content=1&utm_medium=email&utm_source=hackster&utm_term=project_name) I’ve seen for M5stickV
* Short MicroPython example
  - Converts video to ASCII 


<a name="native-modules"></a>
## Native Modules in MicroPython (part 2)
Back in February Damien gave a talk on [Native Modules in MicroPython](https://melbournemicropythonmeetup.github.io/February-2019-Meetup/#Native-Modules-in-MicroPython). The feature has come a long way and it was time for an update!

Damien walks through the details around creating a native module and deploying it - for _multiple platforms_...

<iframe width="960" height="569" src="https://www.youtube.com/embed/AshUrGVrp-A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


<a name="ble-micropython"></a>
Jim has been working hard to bring BLE to life in MicroPython. Recently he's submitted [PR5051](https://github.com/micropython/micropython/pull/5051) that lays the foundation for BLE on all MicroPython ports. Listen to Jim as he discusses the design decisions that led to the current implementation.

<iframe width="960" height="569" src="https://www.youtube.com/embed/3XstExUeJSg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
