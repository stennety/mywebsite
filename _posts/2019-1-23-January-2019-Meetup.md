---
layout: post
title: January 2019 meetup
---

**Matt** presented the news roundup and **Damien** explained some highlights of the (any day now!) v1.10 release of MicroPython.
We then had presentations from a few members about their projects; **Rafal** talked about _Raven_ his MicroPython-powered R/C handset, **Sean** discussed his WiLED project and **Seon** covered the TinyPICO Tester.

Apologies to Sean for the lack of a video; my phone ran out of batteries! We'll get Sean to do a follow-up when the project is complete.

## News: Matt Trentini and Damien George
* There's a new eBook: [MicroPython Programming with the ESP32 and ESP8266](https://randomnerdtutorials.com/micropython-programming-with-esp32-and-esp8266/)
    * US$18
    * The same folks - Rui and Sara Santos - also have useful [MicroPython tutorials online](https://randomnerdtutorials.com/getting-started-micropython-esp32-esp8266/)
* [Sony Sprysense](https://developer.sony.com/develop/spresense/) is now available
    * No MicroPython port yet
    * Interesting specs: CXD5602 Processor, ARM M4F **6 core** 156MHz, 8MB flash, built-in GPS, serious audio support, dedicated camera connector
    * Available from [Seeed for US$65](https://www.seeedstudio.com/Spresense-Main-Board-CXD5602-Microcomputer-for-IoT-Application-p-2846.html?utm_source=mailchimp&utm_medium=edm&utm_campaign=bazaar_0117&mc_cid=475999a578&mc_eid=e98e506a83)
* [LoRa with MicroPython on the ESP8266 and ESP32](https://medium.com/gowombat/iot-lora-with-micropython-on-the-esp8266-and-esp32-59d1a4b507ca)
    * Really good write-up
    * Identified a promising LoRa library, [uPyLora](https://github.com/lemariva/uPyLora)
* Sipeed MAIX RISC-V Module
    * Shiping has begun (haven't received mine yet - soon!)
    * Already there's a good tutorial on running [MicroPython on the Sipeed MAIX](https://robotzero.one/sipeed-maix-micropython/), including face detection!
* [SenseTemp](https://www.crowdsupply.com/capable-robot-components/sensetemp)
    * A feather shield with 4 _accurate_ temperature sensors
    * CircuitPython _and_ MicroPython support
    * Also available: SenseTemp TEC which adds a peltier device to _control_ temperature as well
    * ~US$75
* [Espressif ESP-EYE](https://www.espressif.com/en/products/hardware/esp-eye/overview)
    * ESP32-based camera module
    * 8MB RAM, 4MB flash, 2MP Camera, Microphone, Face recognition using [ESP-WHO](https://github.com/espressif/esp-who)
    * Not yet released publically, will keep you posted
* [SparkFun LumiDrive LED Driver](https://www.sparkfun.com/products/14779)
    * Atmel SAMD21-powered device to control a strand of APA102's
    * Sparkfun's foray into Python on embedded devices (CircuitPython)
    * ~US$20
* Dotstar/APA102 Micropython library
    * [micropython-dotstar](https://github.com/mattytrentini/micropython-dotstar)
    * Pure MicroPython library
    * Bill in the [MicroPython Forum](https://forum.micropython.org/viewtopic.php?t=5810) reports that he can update 3000 APA102's in about a second 
* Adafruit pixelbuf
    * For improved performance, Adafruit are looking to create the `pixelbuf` library that will handle more of the Neopixel/Dotstar update code in C
    * See [#884](https://github.com/adafruit/circuitpython/issues/884) for details
* [Adafruit nRF52840 Feather](https://www.adafruit.com/product/4062)
    * A new CircuitPython-enabled Feather board based on the Nordic nRF52480
    * M4F 64MHz, 1MB flash, 256 flash, 21 GPIO, 6x 12bit ADC, 12 PWM
    * The big feature: BLE, supported by CircuitPython 4
* [Adafruit CircuitPython 4.0.0 beta 0](https://github.com/adafruit/circuitpython/releases/tag/4.0.0-beta.0)
    * Released!
* [nRF52480 Micro Dev Kit USB Dongle](https://github.com/makerdiary/nrf52840-mdk-usb-dongle)
    * Neat nRF52840 board that plugs into USB to program
    * ~US$13
* [M5Stack](https://www.aliexpress.com/store/3226069) are releasing peripherals rapidly!
    * Particularly grove-based peripherals. Fingerprint sensor, PIR, Joystick, colour sensor etc
* [SuperB](https://www.crowdsupply.com/macchina/superb)
    * Bee-compatible ESP32 board
    * Small, US$23
* [Deep sleep wake-on-touch with ESP32 and MicroPython](http://bushta.net/esp32-deepsleep/)
    * Great write-up from Greg; need to feed into the official docs
* [The Giant Board](https://groboards.com/giant-board/)
    * Run Linux on a board in the Feather form-factor!
    * Microchip SAMA5D2 ARM Cortex-A5 Processor 500MHz, 128MB DDR2 RAM
* [D1 Mini Breakout](https://www.tindie.com/products/brianlough/d1-mini-breakout/)
    * Great breakout board (screw terminals and a prototyping area!) for the D1 Mini ESP8266
    * ~US$10
* [Fomu](https://www.crowdsupply.com/sutajio-kosagi/fomu)
    * Has arrived!
    * FPGA in the Tomu form-factor (inside a USB port!)
    * Lattice ICE40UP5K, runs MicroPython
    * ~US$39
* [I2CDriver](https://www.crowdsupply.com/excamera/i2cdriver)
    * From the creator of the [SPIDriver](https://www.crowdsupply.com/excamera/spidriver), this is a similar device to help develop with I2C peripherals
    * Great visualization features
    * US$29
* State machine library
    * [pysm](https://github.com/pgularski/pysm) was released and MicroPython support was added
    * `upip` installable
    * Thanks Piotr Gularski!
* [Adafruit Grand Central M4 Express](https://www.adafruit.com/product/4064)
    * Arduino Mega form factor - huuuge!
    * MicroChip ATSAMD51 Cortex M4 120MHz
    * 1MB + 8MB flash, 256KB RAM, 70 GPIO (!)
    * Great audio support (onboard DSP)
    * US$37.50
* TFT32
    * [Martin Harizanov](https://harizanov.com/) has been working on IoT devices - and with the ESP32 in particular - for some time
    * The [TFT32](https://harizanov.com/wiki/wiki-home/tft32/) is a robust, well-supported ESP32 system with ILI9341 display, touchscreen an ISM radio and more
    * Martin isn't using MicroPython but the board could easily be loaded with a standard ESP32 MicroPython binary
    * ~US$45
* Mike Teachman's MicroPython argument snippets
    * A super useful series of snippets by Mike showing how to create MicroPython modules in C
    * _Many_ different function definitions showing how to get various parameter combinations in and out of a module
    * Indispensible if you're wanting to create a MicroPython C module!
* MicroPython v1.10
    * [Out now!](https://github.com/micropython/micropython/tree/v1.10)
    * Damien walked through some of the major changes in the 1.10 release
    * Nordic NRF ports, ESP32 documentation, *many* bugfixes and improvements 

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRjREiiqA0ew-aMT8nIimbLkgezVQJgcpVFxujAVhA7dLZ4RnUH5CxRZnlJO8e1vGd-n2kmyULmwzDW/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

<iframe width="960" height="569" src="https://www.youtube.com/embed/v3OGhUB5me0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Rafal Wadowski: Raven

Rafal has been working on a new controller for his quadcopter. The project, dubbed _Raven_ came about because Raf wanted to see if it was possible to make a small, robust R/C controller. Most current models don't survive well when 'thrown into a bag' and it would be better if they were more portable. 

With Raven, gone are the accurate analog joysticks, replaced with circular touchpads and some smart software to make up for the lack of accuracy. An M5Stack sits in the middle of the controller communicating with the standard R/C transmitter using the RMT module of the ESP32 to handle the tight timing constraints of the one-wire protocol. 

A neat 3D printed controller and a custom PCB to connect all the electronics round out the package. MicroPython orchestrates everything.

Raf continues to refine the software and the controller is responding better in the simulator every day - he's even flown his quadcopter outdoors! 

Take a look at this ambitious project!

<iframe width="960" height="569" src="https://www.youtube.com/embed/WMaQlDP30iI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Sean Lanigan with his WiLED project

Sean's girlfriend bought an Ikea lamp. It was...fine. Decent. Nothing wrong with it. 

But it didn't have a dimmer. Nor could it be controlled remotely. How hard could it be to add those features?

Before he knew it, Sean had designed and manufactured a custom circuit board, found a new superbright LED cluster, constructed a 3D enclousre to house the electronics and attach to the existing stand and laser cut a beautiful bamboo front panel. 

Oh yeah, he also learnt how to use `asyncio` in MicroPython to add the desired features. It's available online at the [WiLED-Project](https://gitlab.com/WiLED-Project).

Thanks for the talk Sean, sorry about the lack of video! 

## Seon Rozenblum and the TinyPICO Tester

Seon "Unexpected Maker" Rozenblum discusses the TinyPICO Tester; a device designed to test the TinyPICO, post-assembly. 

The TinyPICO is a lovely *tiny* ESP32 development board. Designed around a Raspberry Pi, the TinyPICO Tester uses fully automated tests 
to ensure that all major functions of the TinyPICO board operate as expected. Pressing a button starts the test suite and red/green LEDs
indicate whether the tests were successful. A small display presents progress information to the user as the tests execute and the goal 
is that the whole process takes no more than 30 seconds. 

The Tester will be essential to manage quality when assembly of the TinyPICO is outsourced. 

The software stack that the Tester uses is completely implemented with Python and MicroPython.

<iframe width="960" height="569" src="https://www.youtube.com/embed/S6B-tGvSgIM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

