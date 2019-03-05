---
layout: post
title: February 2019 meetup
---

**Matt** Trentini presented the [news roundup](#News-roundup), **Damien** George presented his latest work-in-progress feature: [native modules in MicroPython](#Native-Modules-in-MicroPython). **Peter** van der Burg discussed [two of his projects](#two-projects): his Home Status Monitor and an accurate power meter.

## News roundup
<a name="News-roundup"></a>
<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vT2x8N3p9-BEGe_GWrqX6eziiAhQz8Zj3XRD2-T9ZZQObTdTTN2bN0SRYaSml7Xow1Iljptjx10K61B/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

<iframe width="960" height="569" src="https://www.youtube.com/embed/DGm4cWChT2A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Matt's New Hardware
What arrived in Matt's letterbox this month?

#### Sipeed MAIX

* One of the first affordable RISC-V solutions
  * And it’s a cracker: 2x 400MHz, plenty of RAM and flash, AI module, camera
  * See last month for details
* [MaixPy](https://github.com/sipeed/MaixPy)
  * MicroPython port for this chipset
- Excellent [build instructions](https://robotzero.one/sipeed-maix-micropython/) from the Robot Zero One blog
- [MickMake published a video](https://www.youtube.com/watch?v=YdshSwDrKgw) that gives a good introduction to the hardware
- MaixPy [v0.1 released last week](https://bbs.sipeed.com/t/topic/486?r=slt-eml-bck-a2e0&utm_source=sailthru&utm_medium=email&utm_campaign=bck-02172019update&utm_term=) with GPIO, UART, SPI, PWM, Timer, LCD, Camera, MiscoSD (FAT32), Flash (SPIFFS), ESP8285 for wifi. Image convolution acceleration, basic OpenMV support (QRCodes, bar codes, find blobs)
- MaixPy v0.2 coming with AVI player, recorder, AI model loader, I2S play, record, FFT, AES, SHA256
- Boris (of LoBo fame) has also released a [K210 port](https://loboris.eu/forum/forumdisplay.php?fid=17) integrating some of his ESP32 port features

#### wESP32

- Discussed in previous meetups
- ESP32 + POE Ethernet
- Separate programmer
- Header to breakout GPIO
- Have created a good [web site](https://wesp32.com/) with excellent information
- **MicroPython is the default software stack!**
- Thanks [Patrick](https://twitter.com/xorbit1)!

#### M5Stack Peripherals

- Needed just two...but they’re so cheap and cool!
  - Joystick
  - Fingerprint sensor
  - Color Sensor
  - IR temp sensor
  - Time of flight laser rangefinder
  - RGB LED hex pad and strip
  - Proto boards, I2C hubs, connectors...

### FOSDEM 2019: PyBoard D

The PyBoard D made an appearance at FOSDEM!

### ESP32

* Potential features
  * I2S Implementation by Mike Teachman
    * [Forum](https://forum.micropython.org/viewtopic.php?f=18&t=5900&p=33757), github - [micropython-esp32-i2s-examples](https://github.com/miketeachman/micropython-esp32-i2s-examples), [PR 4471](https://github.com/micropython/micropython/pull/4471)
  * WPS implementation - [PR4464](https://github.com/micropython/micropython/pull/4464)
    - How WPS works
      - Press a button on a router to allow it to respond to a single scan
      - Put device in scan
      - Wifi details are sent to the (one) scanning device
      - Connection is established
      - Router stops 
  * RMT
    * Matt has started an implementation
  * Pulse counting
    * [Requested](https://forum.micropython.org/viewtopic.php?f=18&t=5997), not for the first time
    * Anyone interested in implementing it? Good first module!
  * ESP NOW
    * [PR4115](https://github.com/micropython/micropython/pull/4115)
    * Seems to have stalled but it’s so close!
  * BLE
* Mike Rankin released a new ESP32-PICO-D4 board powered by a coin cell 
  * ESP32-PICO-D4, battery charger, accelerometer, 0.96" 96x16 OLED
  * [Open hardware designs available](https://github.com/mike-rankin/ESP32_CoinCell)
  * [A coin cell powers this tiny ESP32 dev board](https://hackaday.com/2019/02/22/a-coin-cell-powers-this-tiny-esp32-dev-board/)
  * US$35 on [Tindie](https://www.tindie.com/products/miker/esp32-coincell/)
* TTGO continues to churn out devices
  * [T-Camera Plus](https://www.aliexpress.com/store/product/TTGO-T-Camera-Plus-ESP32-DOWDQ6-8MB-SPRAM-Camera-Module-OV2640-1-3-Inch-Display/2090076_32971057846.html?spm=2114.12010608.0.0.241a5634QRqTU1)
  * 2MP camera, 8MB SPIRAM, 1.3" 240x240 display, microphone, BME280, battery charge
  * Normal or fisheye lens
  * AU$35
  * Another model with a PIR sensor...

### Adafruit

* Scott Shawcroft ([@tannewt](https://twitter.com/tannewt)) recorded a [CircuitPython Deep Dive](https://www.youtube.com/watch?v=baa5ILZTRkQ)
  * Covers memory use in CircuitPython (and MicroPython)
  * Buckle-up, it's over 3 hours!
  * Really nice use of Graphviz to visualise memory 
* [PyPortal](https://www.adafruit.com/product/4116)
  * First batch released yesterday
    * Sold out rapidly!
  * SAMD51, ESP32 for wifi, 3.2" 320x240 display, resistive touch
  * Speaker, light sensor, temp sensor, microSD, 8MB flash
  * US$55

### LoRa/NW-IoT

* Ronoth, small group of devs doing LoRa work
  * First shot of the [S76S STM32/LoRa dev board](https://twitter.com/ronoth_iot/status/1087786588241707008)
    * Documentation [coming too](https://twitter.com/lolsborn/status/1094328412355715072)
    * Working with the dev to see if MicroPython is possible
      * 192KB flash/20KB RAM is *tight*
  * LoStik is available too (USB LoRa device)
* [SnapOnAir Mini](http://www.snaponair.com/index.php/snaponair-mini/)
  * Latest in a line of LoRa 'Walkie Talkie' text communicators by [pwav robot](https://twitter.com/pwavrobot)
  * RFM95, 0.96" OLED, currently Arduino-based
  * 25 Euro (~A$40) 
    * Note: Requires ESP32 dev board and a few passives
* DMtech DEV01
  * ESP32 WROVER with NB-IoT modem (Quectel BC66)
  * Still in development, currently gauging commercial interest
  * Announced on [forum](https://forum.micropython.org/viewtopic.php?f=18&t=5778&sid=2c7f4f3d745a8f387a59949fb63ca2d9)
* [The Things Network announced new Hardware](https://blog.hackster.io/new-gateway-and-sensor-node-hardware-from-the-things-network-e181f0c5c820)
  * Outdoor Gateway (US$399)
    * Weather-proof
    * 3G/4G backhaul, onboard GPS
  * Indoor Gateway (US$69)
    * 8-channel, wifi for backhaul
  * Generic Node (US$25)
    * Microchip SAM R34
      * Cortex M0+, 6x6mm, 256KB flash, 40KB RAM
      * Integrated LoRa

### General

* [ucryptoauthlib](https://github.com/dmazzella/ucryptoauthlib)

  * Pure MicroPython
  * Lightweight driver for Microchip Crypto Authentication
  * Supports [ATECC508A](https://www.microchip.com/wwwproducts/en/ATECC508A) and [ATECC608A](https://www.microchip.com/wwwproducts/en/ATECC608A)
  * ECDH support (Elliptic Curve Diffie-Hellman)
* [Async IO in Python](https://realpython.com/async-io-python/)
  * In depth article about [Asyncio in Python](https://realpython.com/async-io-python/)
  * By the [Real Python](https://realpython.com/) folks who have a ton of great content
  * - In general, they have excellent Python articles
  * Although written for Python it provides a solid basis for MicroPython
    * And much of it is directly usable
* More W600 Cortex M3+ wifi boards announced
  * The [Air602](https://www.seeedstudio.com/Air602-WiFi-Module-p-3139.html) (powered by the W600) was covered in previous meetups
  * - Cheap, certified ARM Cortex M3 + Wifi
  * Module announced, plus two dev boards
  * [Seeed Studio announcement](https://www.seeedstudio.com/w600.html), [Hackster.io follow-up](https://blog.hackster.io/three-new-seeedstudio-w600-based-wireless-boards-347c8ec21d47)
  * Arduino and **MicroPython support** announced for later this year
* [MicroPython on Sonoff](https://medium.com/cloud4rpi/getting-micropython-on-a-sonoff-smart-switch-1df6c071720a)
  * There have been a few guides but this is an excellent addition
* Ivy5661: Potential new target for MicroPython?
  * [Forum post](https://forum.micropython.org/viewtopic.php?f=12&t=5972&p=34348)
  * ARM Cortex M4 @ 416MHz, 802.11**ac**, Bluetooth **5**, 963KB RAM (400KB available)
  * Linaro 96boards format - expansion socket with UART, I2C, SPI, I2S, GPIO
  * But **limited documentation**
  * Seeed Studio are [selling the Ivy5661 for US$35](https://www.seeedstudio.com/Ivy5661-Wi-Fi-and-Bluetooth-IoT-Solution-SoC-SPRD-UWP5661-Cortex-M4-p-2867.html)
* [Calliope](https://calliope.cc)
  * Board designed for education ('improved micro:bit')
  * NRF51822 (Cortex M0, 6KB RAM, 256KB flash)
  * Speakers & Mic, motor controller, USB, compass, motion, acceleration, temperature and brightness sensor, LED array
  * Most examples use [Open Roberta](https://lab.open-roberta.org/), a block-based programming language
    * But a [MicroPython port](https://github.com/calliope-mini/calliope-mini-micropython) is also supported
* [trigBoard - Ultra Low Power ESP8266 IoT Platform](https://www.tindie.com/products/kdcircuits/trigboard-ultra-low-power-esp8266-iot-platform/)
  * Triggers on a GPIO change, pushes a notification over wifi
  * 1uA quiescent
  * [Documentation](https://www.kevindarrah.com/wiki/index.php?title=TrigBoard)
  * US$20
* [micropython-iot](https://github.com/peterhinch/micropython-iot)
  * New [MicroPython library](https://github.com/peterhinch/micropython-iot) by [Peter Hinch](https://github.com/peterhinch) and Kevin Köck
  * Full-duplex communication link between wifi boards and a server
  * Temporary wifi or server outages are tolerated without message loss
  * Tested with ESP8266 and Pyboard D
* Electronut released [Papyr](https://docs.electronut.in/papyr/) an nRF52840 board with e-paper
  * Raytac MDBT50 module
  * 1.54” 200x200 e-paper
  * Runs on a coin cell
  * Application to ‘draw’ on epaper from mobile app
  * ~US\$40 (US\$62 with case and programmer)
* [Mu Editor now supports MicroPython](https://github.com/mu-editor/mu/pull/676)
  - On at least the ESP32/ESP8266
* Display library news
  * [HyperDisplay announced](https://www.sparkfun.com/news/2875?utm_content=85459512&utm_medium=social&utm_source=twitter&hss_channel=tw-17877351) by Sparkfun
    * C-library providing graphics primitives, basic window management, buffering, some drivers
  * [GuiLite](https://github.com/idea4good/GuiLite)
    * Small, lightweight embedded GUI, 5K LOC
  * [M5ez](https://github.com/ropg/M5ez)
    * Arduino library targeting the M5Stack system
    * Designed around M5Stack hardware, including an ingenious three-button keyboard 
  * [M5Flow](http://flow.m5stack.com/)
    * Visually design an interface for the M5Stack
    * Officially supported
    * Blockly currently supported but MicroPython looks close
    * Nice to get started
  * Adafruit's display.io
    * (Feature next month)
  * **LittlevGL**
    * With [MicroPython bindings](https://blog.littlevgl.com/2019-02-20/micropython-bindings)

### Conference news

- Deshipu’s [Computer Games with MicroPython](https://fosdem.org/2019/schedule/event/python_games_with_micropython/) (FOSDEM)
- Jessica Green’s [Python on bare metal](https://speakerdeck.com/sleepypioneer/python-on-bare-metal) (PythonPizzaConf)
- Nina Zaharenko’s [Light up your Life with Python and LED’s!](https://youtu.be/MTdYyCKcI8Q?t=804) ([slides](https://speakerdeck.com/nnja/nina-zakharenko-light-up-your-life-with-python-and-leds-pycascades-2019))(PyCascades)

### Interesting Projects

* OutoftheBOTS' 5x5x5 Rubik's cube solver
  * 7x steppers, 3D printed gears and grippers, custom ESP32 WROVER-based board 
  * Recently optimisations dropped the solving time from >14 mins to <5
  * [Forum](https://forum.micropython.org/viewtopic.php?t=5873), [Latest video](https://www.youtube.com/watch?v=sD4bG8hPYLQ&t=41s)
* [CastVolumeKnob](https://hackaday.io/project/163525-castvolumeknob)
  * Wireless volume knob to control a Chromecast device
    * Visual feedback with a NeoPixel ring
    * Neat 3D print
  * ESP8266, MicroPython, ATTiny85 to keep power down in sleep
* [ESP32 WiPhone](https://hackaday.io/project/159811-esp32-wiphone)
  * Still in development
  * Calls using wifi/SIP
  * Even designing molds themselves and documenting how to do so 
* [Custom firmware for cheap fitness trackers](https://hackaday.com/2019/02/20/custom-firmware-for-cheap-fitness-trackers/)
  * Aaron Christophel gives you all the tools to repurpose that $30 nRF52 fitness tracker
    * 512KB flash, 64KB RAM, 0.96" IPS SPI display, motion sensor, pulse sensor, battery charger, touch integrated
    * MicroPython will happily run on this device...

### Wrap up

[ARM Cortex-M0 is 10 years old](https://twitter.com/DominicPajak/status/1099377967120240642) (that model doesn't run MicroPython...yet!)


<a name="Native-Modules-in-MicroPython"></a>
## Native Modules in MicroPython
Damien George presented his work-in-progress solution to loading native code from MicroPython modules. Currently all native code has to be compiled in to the MicroPython firmware binary which can make it harder to integrate high-performance code. This solution will allow modules containing native code and/or MicroPython code (and Viper, Thumb and XTensa code...) to be compiled into mpy files that can be loaded at *runtime*. 

Potentially this is a *huge* feature that would mean modules can be built and packaged with native and Python components! Even MicroPython itself could possibly be trimmed down since modules can now be efficiently packaged outside of the firmware binary. 

Very exciting to us MicroPythonistas!

Although it's difficult to make out the contents of the screen, hopefully the details are less important than following along for the general gist of the feature. We'll try to record the screen directly in the future. 

Take a look at [PR 4535](https://github.com/micropython/micropython/pull/4535) for details.

<iframe width="960" height="569" src="https://www.youtube.com/embed/GDXsK1bkSdA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<a name="two-projects"></a>
## Two Projects by Peter
Peter van der Burg presented two of his MicroPython-powered projects: 1) a Home Status Monitor and 2) a Power Meter. 

It was a really interesting talk covering MicroPython on the ESP8266, querying data from the real world, heaters in fridges, electronic design with sensitive comparators and how family life can be streamlined with some pragmatic solutions!

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRJ8S7UEYC2B0WtKHyvfDyhWj0xNw366hf1vilk2OvtwUQlOOus02ZyCHIDvC37XU9HkGftZejA9yVe/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

<iframe width="960" height="569" src="https://www.youtube.com/embed/0q9YMevZjrM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>




