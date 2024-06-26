---
layout: post
title: October 2018 meetup
---

Matt presented the usual news roundup.

## News: Matt Trentini
* The [OHS Badge](https://oshwabadge2018.github.io/) is an interesting, MicroPython-driven badge with E-ink developed for the [OHS conference](https://2018.oshwa.org/) attendees
    * Now available on [Tindie](https://www.tindie.com/products/pdp7/open-hardware-summit-2018-badge/)
* The [Blyst Nano](https://www.crowdsupply.com/i-syst/blyst-nano), a tiny NRF52 board, is seeking funding on Crowd Supply
    * There is an NRF52 port of MicroPython, shouldn't take much tweaking to run on this module
* The [ESP32-CAM](https://www.seeedstudio.com/ESP32-CAM-Development-Board-with-camer-p-3153.html), a small ESP32-powered 2MP camera module is now available
    * Should run standard MicroPython though there's currently no known camera driver that would work...
* The [Air602](https://www.seeedstudio.com/Air602-WiFi-Module-p-3139.html) is a Cortex-M3 micro with wifi support crammed into a _tiny_ castellated module
    * No MicroPython port yet and could be difficult as there is a lack of documentation
    * Especially remarkable for the low price (<$2)
* Espressif announced their support for [Alexa on ESP32](https://www.espressif.com/en/news/Alexa%20on%20ESP32)
    * Makes it easier to create Alexa skills for ESP32. Currently just C-API support and only on Lyra boards.
* Bluetooth update: Matt has tried to pull together all the individual parties working on MicroPython Bluetooth API's but it's _difficult_...
* Make: Electronics 2018 Humble Book Bundle was a good-value set of books for budding electronics enthusiasts - but it's expired now! Sorry if you missed out.
* M5Stack [M5Stick](https://www.aliexpress.com/store/product/M5Stack-Official-New-M5Stick-Mini-Development-Kit-ESP32-1-3-OLED-80mAh-Battery-Inside-Buzzer-IR/3226069_32947692973.html?spm=a2g1x.12024536.productList_5885011.pic_0) first-batch announced
    * ESP32 with small OLED, battery and optional accelerometer. Small, neat and cheap.
* [TinyPICO](http://tinypico.com/) update: Rev 4 just assembled
    * Improved WiFi (3D antenna) and APA102 on-board now. Experimenting with adding PSRAM. Small, _very_ capable PICO ESP32 dev board!
* [MicroPython documentation](https://docs.micropython.org) update
    * Big improvement: Damien reorganised the documentation so it's no longer port-centric
    * Now the documentation is generic-first with links to port-specific docs
    * Should encourage more generic implementations
    * Matt is personally keen to begin the ESP32 documentation effort...
* UI libraries
    * We have the [Loboris port](https://github.com/loboris/MicroPython_ESP32_psRAM_LoBo) and Peter Hinch's [micropython-nano-gui](https://github.com/peterhinch/micropython-nano-gui) but there's room for improvement here
    * Matt is considering working on a MicroPython GUI library - particularly to support the 320x240 display of the M5Stack
    * If you'd like to help out please get in touch!
* Python (not Micro) update
    * 3.7.1 and 3.6.7 were released

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRa-llBycTAzPu8PvprAEP7EJEmIVytyJBdE0eq9OGx9OjuVaggKqUpZVoG5t39M3iYXtiImjQfcUjM/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

<iframe width="960" height="569" src="https://www.youtube.com/embed/q2r6Sp4EIno" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
