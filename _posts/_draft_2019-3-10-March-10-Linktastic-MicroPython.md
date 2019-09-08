---
layout: post
title: March 10 Linktastic MicroPython
---

Collection of recent MicroPython links

## Hardware
* Arch Mix
  * A new **powerful** board based on the NXP i.MX RT1052 (Cortex M7, 600MHz!) has been [announced](https://www.seeedstudio.com/blog/2019/03/07/all-new-arch-mix-development-board-on-newproductstuesday-seeed/)
  * Rich set of peripherals, relatively small (67mm x 39 mm)
  * MicroPython apparently available already 
  * _Very_ affordable at US$30, [available now from Seeed](https://www.seeedstudio.com/Arch-Mix-p-2901.html)
* M5Stack M5StickC
  * 'Limited trial' release of the new [M5StickC](https://www.aliexpress.com/store/product/New-Arrival-2019-M5StickC-1-of-Limited-Trial-Edition-ESP32-PICO-Mini-IoT-Development-Board-Finger/3226069_32985247364.html?spm=2114.12010615.8148356.1.64815d5dJ8YRzN)
    * **US$1!** The catch: Use any existing M5Stack product to make an application and take some photos/video to be eligible to purchase
    * Still runs MicroPython
    * Small; 48x21x14mm, same size as current models
    * But _more hardware_: Colour 80x160 LCD, 6-axis IMU, microphone, 2x buttons, Grove port, 80mAH battery and 8-pin external header
* [SparkFun ESP32 Thing Plus](https://www.sparkfun.com/products/14689)
  * A new ESP32 board from Sparkfun in the **Adafruit Feather form-factor**
    * Builds on Sparkfun's older ESP32 Thing
  * Qwiic connecter, 16MB flash, battery charge circuit
  * US$21
* Pygate
  * Pycom announced that the [Pygate is now available for pre order](https://pycom.io/product/pygate/)
  * 8-channel LoRaWAN gateway built as a shield for any of the Pycom WiPy3.0, LoPy4 or GPy
  * PoE as an option
  * ~US$56 (or ~US$79 w PoE)
    * Cheap for an 8-channel gateway

## Software
* [Nimpy](https://github.com/yglukhov/nimpy)
  * Nimpy is a Nim-Python bridge; can call Nim code from Python _and_ vice versa
  * Maintainer is considering adding support for building native MicroPython libraries using Nim
    * If you are interested get in touch!
* [brother_ql](https://github.com/pklaus/brother_ql)
  * A python module to print labels using a wide range of Brother Label printers
  * Matt has a need for this and has investigated porting to MicroPython; looks feasible, work has started
    * Wifi label printing would be super useful from an embedded device!
    
## Tutorials
* [MicroPython: Interrupts with ESP32 and ESP8266](https://randomnerdtutorials.com/micropython-interrupts-esp32-esp8266/)
  * Learn the basic of how to use interrupts within MicroPython
  * Great example to light a LED on an interrupt when a PIR motion sensor is triggered
* Debouncing in MicroPython
  * A reminder that switch debouncing is largely solved - and easy to use! - with asyncio in MicroPython
  * The [Switch and Pushbutton](https://github.com/peterhinch/micropython-async/blob/master/DRIVERS.md) classes are part of [Peter Hinch](https://github.com/peterhinch)'s excellent [micropython-async library and tutorial](https://github.com/peterhinch/micropython-async/blob/master/DRIVERS.md)
* [Teardown of a Smart Plug (or two)](https://blog.hackster.io/teardown-of-a-smart-plug-or-two-6462bd2f275b)
  * Great write-up by Hackster.io about disassembling two wifi controllable power sockets 
  * While the article doesn't cover MicroPython they are both powered by ESP8266; trivially easy to flash
  * Just do be safe if you decide to look into this!
* [Portable WiFi LED Matrix Marquee](https://www.hackster.io/eraserX/portable-wifi-led-matrix-marquee-b4f8b5)
  * Another Hackster.io article that covers how to build a scrolling display with a cheap 8x32 matrix array
  * Provides instructions and MicroPython code
