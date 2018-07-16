---
layout: page
title: Memory Forensics Resources
permalink: /memory/
---

I found a bunch of free resources for memory images when I wanted to do a deeper dive into memory forensics linked from the volatility wiki, only to be stymied by 404s from people hosting things in personal dropbox links or the like. After some Google-fu, I found archived copies of things, and am now hosting mirrors of the more helpful items...

... in my own Dropbox to 404 out sometime in the future. Hey, it's hard to find free hosting of larger files indefinitely!

# Downloads

## Interesting Memory Images
* [Stuxnet Memory Dump](https://www.dropbox.com/s/za92hmp92vo3htv/stuxnet.vmem.gz?dl=1) ([md5](https://www.dropbox.com/s/wk02g1hadkkggkl/stuxnet.vmem.gz.md5?dl=1))
* [HoneyNet Banking Troubles](https://www.dropbox.com/s/8zxw3fy0k0693qv/Bob.vmem.gz?dl=1)  ([md5](https://www.dropbox.com/s/xbc764437tw9c9s/Bob.vmem.gz.md5?dl=1)) - Mirrored from the [HoneyNet Project](https://www.honeynet.org/challenges/2010_3_banking_troubles)
* [Shylock Banking Malware](https://www.dropbox.com/s/g7cv8ugiht4dyne/shylock.vmem.gz?dl=1) ([md5](https://www.dropbox.com/s/zzfaltyd7zfk41o/shylock.vmem.gz.md5?dl=1))
* [Black Energy 2](https://www.dropbox.com/s/6ultallclq973gm/be2.vmem.gz?dl=1) ([md5](https://www.dropbox.com/s/yerm223vlgasnnf/be2.vmem.gz.md5?dl=1)) Mirrored from the [Maleware Cookbook DVD](https://www.sendspace.com/pro/dl/p87m18). GPL Licensed
* [Zeus Trojan](https://www.dropbox.com/s/f7v43iujxg2dx3g/zeus.vmem.gz?dl=1) ([md5](https://www.dropbox.com/s/962ui6hliav1nf9/zeus.vmem.gz.md5?dl=1)) Mirrored from the [Maleware Cookbook DVD](https://www.sendspace.com/pro/dl/p87m18). GPL Licensed

## Tools
* [Sift Workstation](https://digital-forensics.sans.org/community/downloads) - comes with volatility, rekall and a number of other DFIR tools configured and installed.

## Resources

* [Volatility Command Wiki](https://code.google.com/archive/p/volatility/wikis/CommandReference.wiki)
* SANS Memory Forensics Posters - [Rekall centered](https://digital-forensics.sans.org/media/Poster_Memory_Forensics.pdf) and [Volatility centered](https://digital-forensics.sans.org/media/Poster-2015-Memory-Forensics.pdf)
* [SANS Hunt Evil Poster](https://www.sans.org/security-resources/posters/hunt-evil/165/download) (Quick guide to what's normal for windows)

## Deeper Dives

* Stuxnet analysis by Micheal Hale Ligh [Stuxnet's Footprint in Memory with Volatility 2.0 ](https://mnin.blogspot.com/2011/06/examining-stuxnets-footprint-in-memory.html). Note a few commands have changed slightly from 2.0 when this was written to 2.6, but the IOC analysis is still spot on.
* [Shylock analysis](http://quequero.org/Shylock_via_volatility) access via [archive.org](https://web.archive.org/web/20140403235134/http://quequero.org:80/2011/10/shylock-via-volatility/)
* [Zeus Trojan Memory Analysis](http://www.behindthefirewalls.com/2013/07/zeus-trojan-memory-forensics-with.html) by Javier Nieto
* [Zeus Trojan Memory Analysis](https://malwarereversing.wordpress.com/2011/09/23/zeus-analysis-in-volatility-2-0/) by evild3ad