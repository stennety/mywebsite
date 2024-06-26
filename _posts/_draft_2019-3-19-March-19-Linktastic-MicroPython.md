---
layout: post
title: March 19 Linktastic MicroPython
---

Collection of recent MicroPython links

## Big ticket items
![TinyPICO](https://www.crowdsupply.com/img/bd66/tinypico-pinout-2_jpg_project-body.jpg)
* [TinyPICO Coming Soon page](https://www.crowdsupply.com/unexpected-maker/tinypico) now online!
  * Seon and Matt expect the campaign to go live soon...
* Cross-platform Bluetooth support [PR #4589](https://github.com/micropython/micropython/pull/4589)
  * Long awaited support for Bluetooth finally starting to appear - still early days
  * Basic advertising support working on ESP32, nRF5x, micro:bit ports - with PyBoard D coming soon

## Hardware
* Ronoth [LoDev S76S campaign](https://www.crowdsupply.com/ronoth/lodev) is live
  * As covered in the [February meetup](https://melbournemicropythonmeetup.github.io/February-2019-Meetup/)
  * LoRa dev board featuring the interesting S76S system-in-a-package (SX1276+STM32L073)
  * Ronoth are hoping to run MicroPython on the micro though it's going to be _very_ tight!
    * 192KB flash, 20KB RAM (eek!)

## Software
* [Liveness Detection with OpenCV](https://www.pyimagesearch.com/2019/03/11/liveness-detection-with-opencv/)
  * A fascinating article discussing how to implement a facial recognition system that can detect fake faces
  * Currently not using MicroPython but ought to be possible with the soon-to-be-delivered [OpenMV H7](https://www.kickstarter.com/projects/1798207217/openmv-cam-h7-machine-vision-w-micropython) or [Sipeed MAIX](https://www.indiegogo.com/projects/sipeed-maix-the-world-first-risc-v-64-ai-module#/)
* Sipeed MAIX
  * [MNIST demo](https://www.youtube.com/watch?v=WhJuCODEfpQ&feature=youtu.be)
    * The classic neural net - detect numbers from handwriting. FAST.
  * Spectacular NES emulator (in MicroPython) demo
    * Tutorial at [RobotZeroOne](https://robotzero.one/micropython-nes-emulator-on-a-risc-v-64-processor/)
    * Awesome [video](https://www.youtube.com/watch?v=el6CB-h9Lo0)

## Misc
* [Deshipu](https://twitter.com/deshipu) [announced](https://twitter.com/deshipu/status/1107361785068306432) that he's created a [mailing list for Pew Pew users](https://mail.python.org/mailman3/lists/pewpew.python.org/)
* Ray Ozzie is [using Python on embedded devices](https://twitter.com/rozzie/status/1106531501317992448)!
  * And immediately laments that the libraries already differ between CircuitPython, MicroPython and Linux... :(
