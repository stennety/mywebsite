---
layout: post
title: October 2019 meetup
---

**Matt** Trentini delivered the [news roundup](#News-roundup) and **Damien** George talked about a [mixed bag](#mixed-bag) of topics including the Code of Conduct, BLE, Manifest files and Boards for the ESP32.

## News roundup
<a name="News-roundup"></a>

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTl0vo_3-PnSoX_woLufDRLAlNNnidREq2ckTbmnOEmtvn4AYd5lVb-BUv5gSTFiqP9U6KwltAnofPY/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

<iframe width="960" height="569" src="https://www.youtube.com/embed/-E2mCiMHw70" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### PyLadies Workshop
* Delivered a MicroPython Starter Workshop to the PyLadies
  * Was a *fantastic* experience!
* First time we’ve been through our [MicroPython Workshop](https://micropython-workshop.readthedocs.io/) material
  * [Github](https://github.com/mattytrentini/micropython_workshop), [Introductory Slides](https://docs.google.com/presentation/d/1kBm8YsX7sYx8pFmNHL0b7HM2EFQUV3dxOUeKSYTgmHE)
* Intent is that this can be used by any beginner
  * With documentation that is clear
* Hardware ‘kit’ needs to be cheap ($25)
  * TTGO ESP32, RGB LED Shield
  * More shields available to purchase
  * Shields for simplicity

### Pycom GOINVENT
* Pycom are in the middle of a global tour to promote their products
  * The Melbourne session was Monday, entry included a FiPy
* My take-home…
  * Some really nice hardware (all sorts of RF interfaces!)
  * Demos were underwhelming
  * VS Code plugin was problematic
  * Some interesting ideas: pybytes in particular
  * Their license is a deal-breaker for me

### Adafruit New Products
* [Feather STM32F405 Express](https://www.adafruit.com/product/4382)
  * Runs MicroPython, CircuitPython soon
  * Limor submitted the PR to support the board
  * Out of stock...
* nRF52840 Itsy Bitsy
  * “Coming Soon”, nearly done
  * Should be an excellent small BLE-capable dev board

### Lessons learned from building a CircuitPython board
* Thea Flowers has a nice blog post discussing [lessons learned](https://blog.thea.codes/lessons-learned-from-building-a-circuitpython-board/)
* Valuable read if you’re wanting to make your own hardware
  * Particularly for Micro/CircuitPython

### MicroWebSrv2
* Hot off the press (today)!
* [MicroWebSrv2](https://github.com/jczic/MicroWebSrv2)
  * A new version of Jean-Christophe Bos’ ([jczic](https://github.com/jczic)) Web Server for MicroPython
* Features
  * Asynchronous architecture, SSL/TLS, web routes, web sockets module, template system, good documentation

### Seeed Studio: RISC-V
* Doubling down on RISC-V
* Sipeed Longan Nano
  * RISC-V GD32VF103: 128KB flash, 32KB RAM
  * 160x80 IPS display
  * US$4.90
* Wio Lite with ESP8266
  * Feather form factor, wifi
  * US$6.90
* Also stocking Sipeed K210-based boards

### mp-RA8875
* MicroPython driver for the RA8875
  * Allows TFT displays of 800x480
  * Also: Resistive touch
  * Port of a CircuitPython library

### MicroPython Taking photos with an ESP32
Mauro Riva: [Taking photos with an ESP32](https://lemariva.com/blog/2019/09/micropython-how-about-taking-photo-esp32)
  * Uses the ESP32-CAM, I2S and an OV2640 driver
  * Really detailed!
More on Mauro’s “LeMaRiva” site
  * [MicroPython: VSCode IntelliSense, Autocompletion & Linting capabilities](https://lemariva.com/blog/2019/08/micropython-vsc-ide-intellisense)
  * [MAiX Dock & MicroPython: Hands-On with low power AI at the edge](https://lemariva.com/blog/2019/04/maixpy-low-power-ai-edge)
  * [Review: Meet the M5Stack FIRE](https://lemariva.com/blog/2019/03/review-meet-the-m5stack-fire)
  * [MicroPython: Home Automation using Blynk connected to a WiPy 3.0 / 2.0](https://lemariva.com/blog/2019/02/micropython-home-automation-using-blynk-connected-to-a-wipy-3-0-2-0)
  * [MicroPython: Programming an ESP using Jupyter Notebook](https://lemariva.com/blog/2019/01/micropython-programming-an-esp-using-jupyter-notebook)

### MicroPython C Module Documentation
* [Micropython-usermod](https://micropython-usermod.readthedocs.io/) on Read the Docs
  * By Zoltán Vörös - thanks!
  * An excellent resource if you want to build a C module for MicroPython!
  * Covers: argument parsing, classes, iterables, error handling


<a name="mixed-bag"></a>
## CoC, BLE, Manifest FIles and Boards for ESP32
Damien talked about a mixed bag of topics including the Code of Conduct, BLE, Manifest files and Boards for the ESP32.

<iframe width="960" height="569" src="https://www.youtube.com/embed/Yh_uMrrJv80" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
