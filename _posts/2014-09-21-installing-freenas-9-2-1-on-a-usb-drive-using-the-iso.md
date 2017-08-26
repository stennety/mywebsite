---

published: true
title: Installing FreeNAS 9.2.1 on a USB drive using the ISO
---
I'm on a budget, and needed a NAS for Time Machine backups. I happened to have 8GB of RAM, an old AMD Athlon X2 machine, and 7 Western Digital Caviar Green 1 TB drives to spare. I did not, however, have a CD drive, so I was stuck installing purely using the ISO and USB drives. After I assembled the machine, I ran into many headaches getting FreeNAS to actually install.

I tried burning the ISO to a USB stick using the dd command on my Mac and Ubuntu. It wouldn't boot. I tried using the live \*.img file from FreeNAS's site on a USB stick. It booted but I got an "Error 19: corrupt or invalid GPT table on da0" (the USB drive I was booting off of) message and was dropped to the useless mountroot prompt. I tried using UNetBootIn to burn the installer ISO to the USB stick. I got an error that the partition was invalid.

Finally, I gave up and decided to try installing FreeNAS to a USB stick inside a virtual environment, and this worked for me. I opened VMWare Fusion, created a new virtual machine from the FreeNAS installer ISO file, booted into it, attached the USB stick, forwarded the device to the VM, and installed the operating system onto it. I was then able to boot the machine off of the USB stick with no trouble.

Hope that helps anyone who's having issues with the install process!

Oh, and to set up a Time Machine share, I followed [this tutorial](http://www.notquitemainstream.com/2014/03/25/how-to-set-up-time-machine-for-multiple-macs-on-freenas-9-2-1-3/) and it worked nicely.

Here are a few photos of the final product:

![]({{site.cdn_path}}/2014/09/21/1.jpg)
![]({{site.cdn_path}}/2014/09/21/2.jpg)
![]({{site.cdn_path}}/2014/09/21/3.jpg)
