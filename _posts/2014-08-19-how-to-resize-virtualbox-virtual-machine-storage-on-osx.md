---

published: true
title: How to resize VirtualBox virtual machine storage on OSX
---
I ran out of space on a VirtualBox Windows VM recently and needed to resize the virtual hard disk. I searched around and these are the steps that ultimately worked for me.

1. Power down the VM.
2. Open a terminal, and navigate to the directory in which the virtual machine's disk (*.vdi file) resides.
3. Execute this: VBoxManage modifyhd YOUR\_HARD\_DISK.vdi –resize SIZE\_IN\_MB
4. Power up the VM.
5. Right click on "Computer" and choose "Manage." Go to "Storage," right click on the volume, and choose "Extend Volume."  Follow the prompts to expand the partition to fill the newly-allocated space.

![1.png]({{site.cdn_path}}/2014/08/19/1.png)
![2.png]({{site.cdn_path}}/2014/08/19/2.png)

Troubleshooting:

* If the Windows VM initially doesn't recognize the new storage space, try rebooting it.
* If the virtual drive wasn't set up as dynamic, you may need to clone it onto a dynamic drive and resize that one. There are guides elsewhere on how to do this.
* If you're on a Linux host, steps 1-4 will be the same. Just use gparted or a similar utility to resize the partition.
