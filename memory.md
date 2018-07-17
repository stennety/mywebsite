---
layout: page
title: Memory Forensics Resources
permalink: /memory/
---

I found a bunch of free resources for memory images when I wanted to do a deeper dive into memory forensics linked from the volatility wiki, only to be stymied by 404s from people hosting things in personal dropbox links or the like. After some Google-fu, I found archived copies of things, and am now hosting mirrors of the more helpful items...

... in my own Dropbox to 404 out sometime in the future. Hey, it's hard to find free hosting of larger files indefinitely!

# Downloads

## Interesting Memory Images
* [Stuxnet](https://www.dropbox.com/s/za92hmp92vo3htv/stuxnet.vmem.gz?dl=1) ([md5](https://www.dropbox.com/s/wk02g1hadkkggkl/stuxnet.vmem.gz.md5?dl=1))
* [HoneyNet Banking Troubles](https://www.dropbox.com/s/8zxw3fy0k0693qv/Bob.vmem.gz?dl=1)  ([md5](https://www.dropbox.com/s/xbc764437tw9c9s/Bob.vmem.gz.md5?dl=1)) - Mirrored from the [HoneyNet Project](https://www.honeynet.org/challenges/2010_3_banking_troubles)
* [Shylock Banking Malware](https://www.dropbox.com/s/g7cv8ugiht4dyne/shylock.vmem.gz?dl=1) ([md5](https://www.dropbox.com/s/zzfaltyd7zfk41o/shylock.vmem.gz.md5?dl=1))
* [Black Energy 2](https://www.dropbox.com/s/6ultallclq973gm/be2.vmem.gz?dl=1) ([md5](https://www.dropbox.com/s/yerm223vlgasnnf/be2.vmem.gz.md5?dl=1)) Mirrored from the [Malware Cookbook DVD](https://www.sendspace.com/pro/dl/p87m18). GPL Licensed
* [Zeus Trojan](https://www.dropbox.com/s/f7v43iujxg2dx3g/zeus.vmem.gz?dl=1) ([md5](https://www.dropbox.com/s/962ui6hliav1nf9/zeus.vmem.gz.md5?dl=1)) Mirrored from the [Malware Cookbook DVD](https://www.sendspace.com/pro/dl/p87m18). GPL Licensed
* [GrrCon 2012 Forensics Challenge Memory Dump](https://www.dropbox.com/s/277ned1o58hxcqp/grrcon2012-forensics-challenge.img.gz?dl=1) ([md5](https://www.dropbox.com/s/ltc845wb1sw7med/grrcon2012-forensics-challenge.img.gz.md5?dl=1)) - Part of a [larger ISO](https://docs.google.com/uc?id=0B0e8hEJOUKb9RU1tRUsxenBxWWc&export=download&pli=1) (password grrcon2012) 

## Tools
* [Sift Workstation](https://digital-forensics.sans.org/community/downloads) - comes with volatility, rekall and a number of other DFIR tools configured and installed.

## Resources

* [Volatility Command Wiki](https://code.google.com/archive/p/volatility/wikis/CommandReference.wiki)
* SANS Memory Forensics Posters - [Rekall centered](https://digital-forensics.sans.org/media/Poster_Memory_Forensics.pdf) and [Volatility centered](https://digital-forensics.sans.org/media/Poster-2015-Memory-Forensics.pdf)
* [SANS Hunt Evil Poster](https://www.sans.org/security-resources/posters/hunt-evil/165/download) (Quick guide to what's normal for windows)

## Other People's Analysis

* Stuxnet analysis by Micheal Hale Ligh [Stuxnet's Footprint in Memory with Volatility 2.0 ](https://mnin.blogspot.com/2011/06/examining-stuxnets-footprint-in-memory.html)
* [Shylock analysis](http://quequero.org/Shylock_via_volatility) (access via [archive.org](https://web.archive.org/web/20140403235134/http://quequero.org:80/2011/10/shylock-via-volatility/))
* [Zeus Trojan Memory Analysis](http://www.behindthefirewalls.com/2013/07/zeus-trojan-memory-forensics-with.html) by Javier Nieto
* [Zeus Trojan Memory Analysis](https://malwarereversing.wordpress.com/2011/09/23/zeus-analysis-in-volatility-2-0/) by evild3ad
* [GrrCon 2012 forensics challenge walkthrough using only memory analysis](https://volatility-labs.blogspot.com/2012/10/solving-grrcon-network-forensics.html)