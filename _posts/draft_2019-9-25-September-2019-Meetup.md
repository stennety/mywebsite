---
layout: post
title: September 2019 meetup
---

**Matt** Trentini discussed the latest and greatest MicroPython [news](#News-roundup) and **Andrew** showed us how he's
set up a Gitlab [CI](#ci) process to build *every* MicroPython port in less than ten minutes.

## News roundup
<a name="News-roundup"></a>
<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vR1oBx0YBv2r41WxiYtzkYgIRpQdbl1oLxVPDRix2O9aqOlXJyaYKg-SNw1CGWbidq7HWANfhJmP9c7/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

<iframe width="960" height="569" src="https://www.youtube.com/embed/cZlFqPEvEmY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Sad day
* Left the box of hardware

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


<a name="ci"></a>
## Gitlab Continuous Integration for MicroPython 

Back in February Damien gave a talk on [Native Modules in MicroPython](https://melbournemicropythonmeetup.github.io/February-2019-Meetup/#Native-Modules-in-MicroPython). The feature has come a long way and it was time for an update!

Damien walks through the details around creating a native module and deploying it - for _multiple platforms_...
Need link!

<iframe width="560" height="315" src="https://www.youtube.com/embed/qc1bTOdMbrA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
