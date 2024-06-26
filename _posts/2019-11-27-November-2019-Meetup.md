---
layout: post
title: November 2019 meetup
---

**Matt** Trentini covered the latest MicroPython [news](#News-roundup), **Peter** van der Berg explained how he's used MicroPython to power his latest [art project](#art) and **Damien** George gives us the [low-down on LittleFS](#littlefs) - it's coming to MicroPython!

## News roundup
<a name="News-roundup"></a>

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRmgEncTOulhz4aJEW8cytKu2YyqketLP9oLs05JdrvqAh2SbroQJ_O0UAyDavtzMCWz88Wf5M8Xrxw/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

<iframe width="960" height="569" src="https://www.youtube.com/embed/xzTOXaPgwO0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Meadow
* Kickstarter, delivered!
* Tech
  * STM32F777, 32MB RAM, 32MB Flash (+2MB)
  * ESP32 coprocessor for WiFi/BLE
  * Battery charging
  * Feather form factor
* Designed to run .NET
* Now runs MicroPython!
* US$50

### PineTime
* Pine64 caused a stir with PineTime
* US$25 watch seems popular!
* I suggested MicroPython should be ported to it...
* Could use some help!
* Nordic NRF52832, 64KB RAM, 512KB Flash
  * That part is in good shape
* Peripherals
  * ST7789 240x240 IPS display
  * Power management
  * SPI Flash 8MB
  * Touchpad CST816S
  * Accelerometer BMA421
  * Heart rate sensor HRS3300

### Black Pill
* First there was the Blue Pill
  * STM32F103: ARM M3 72MHz, 20KB RAM, 64KB Flash
  * Very popular in the Arduino community - cheap! US$2
  * A little underpowered for MicroPython
* Enter, the Black Pill
  * STM32F411: M4 100MHz, 128KB RAM, 512KB Flash
  * Still cheap, US$4
  * Optional external flash (up to 16MB)
  * Board definitions under development

### Wemos
* W600
  * Cheap board with Wifi
  * M3, 300KB RAM, 1MB Flash
  * ESP8266 competitor
  * AU$3.12
* 2.4” TFT
  * 320x240 display with resistive touchscreen
  * Fits the D1 mini form factor
  * AU$8.70

### PyLadies 'homework'
* Bouncing ball!

### OpenMV H7
* Big update
 * Update to MicroPython 1.11
 * Tensorflow support
 * Built-in person detection
* Also tentatively announced a new board
 * STM32H743, 32MB RAM, 32MB flash, 5MP cam

### CircuitPython 5.0.0 beta
* Big update coming from Adafruit
  * Display.io improvements (greyscale OLDE, e-paper)
  * BLE
  * STM32F4
  * Sony Sprense
  * PWM audio

### Pull requests

* ESP32 RMT
* LittleFS is in mainline
* Rewrite of Asyncio
* BLE documentation has improved

<a name="art"></a>
## Natural Sequence or Fabricated: MicroPython-powered art
Peter discussed his latest art installation for the City of Whittlesea's [SOS Annual Art Exhibition](https://www.whittlesea.vic.gov.au/arts-events-recreation/things-to-see-and-do/events/sos-annual-art-exhibition/)

<iframe width="960" height="569" src="https://www.youtube.com/embed/LVqFETunxK4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<a name="littlefs"></a>
## LittleFS integration for MicroPython
Damien explains and demonstrates recent additions to MicroPython to provide LittleFS integration. LittleFS is a lightweight, highly robust filesystem designed for embedded use.

<iframe width="960" height="569" src="https://www.youtube.com/embed/wkgU4fGP3eY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
